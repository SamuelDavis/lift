export enum Store {
  EXERCISES = "exercises",
}

export function openDb(
  name: string,
  version: number,
  onUpgradeNeeded: (
    db: IDBDatabase,
    oldVersion: number,
    newVersion: number | null
  ) => void
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("lift");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) =>
      onUpgradeNeeded(request.result, event.oldVersion, event.newVersion);
  });
}

export class DAO<T> {
  constructor(private db: IDBDatabase, private store: string) {}
  add(value: T) {
    return this.transaction<IDBValidKey>((store) => store.add(value));
  }

  put(value: T, key: IDBValidKey) {
    return this.transaction<IDBValidKey>((store) => store.put(value, key));
  }

  delete(key: IDBValidKey) {
    return this.transaction((store) => store.delete(key));
  }

  private transaction<T = undefined>(
    createRequest: (store: IDBObjectStore) => IDBRequest
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.store, "readwrite");
      const objectStore = transaction.objectStore(this.store);
      const request = createRequest(objectStore);
      let result: T;

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve(result);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => (result = request.result);
    });
  }

  readAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.store);
      const objectStore = transaction.objectStore(this.store);
      const request = objectStore.openCursor();
      let result: T[] = [];

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve(result);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        if (request.result instanceof IDBCursorWithValue) {
          result.push({ key: request.result.key, ...request.result.value });
          request.result?.continue();
        }
      };
    });
  }
}
