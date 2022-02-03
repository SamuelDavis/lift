export enum Store {
  EXERCISES = "exercises",
}

function openDb(
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

  private readMany(
    createCursorRequest: (
      store: IDBObjectStore
    ) => IDBRequest<IDBCursorWithValue>
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.store);
      const objectStore = transaction.objectStore(this.store);
      const request = createCursorRequest(objectStore);
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

  readAll() {
    return this.readMany((store) => store.openCursor());
  }

  readIndex(index: string) {
    return this.readMany((store) => store.index(index).openCursor());
  }
}

export function createDb() {
  return openDb("lift", 1, (db: IDBDatabase, oldVersion: number) => {
    if (oldVersion < 1) {
      const exercises = db.createObjectStore(Store.EXERCISES, {
        autoIncrement: true,
      });
      exercises.createIndex("name", "name");
      exercises.createIndex("modality", ["name", "modality"]);
      exercises.createIndex("repetitions", ["name", "modality"]);
    }
  });
}
