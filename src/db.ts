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

function write<T>(
  db: IDBDatabase,
  store: string,
  value: T
): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readwrite");
    const objectStore = transaction.objectStore(store);
    const request = objectStore.add(value);
    let result: IDBValidKey;

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve(result);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => (result = request.result);
  });
}

function readAll<T>(db: IDBDatabase, store: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store);
    const objectStore = transaction.objectStore(store);
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

export const db = await openDb(
  "lift",
  1,
  (db: IDBDatabase, oldVersion: number) => {
    if (oldVersion < 1) {
      const exercises = db.createObjectStore(Store.EXERCISES, {
        autoIncrement: true,
      });
      exercises.createIndex("name", "name");
      exercises.createIndex("modality", ["name", "modality"]);
      exercises.createIndex("repetitions", ["name", "modality"]);
    }
  }
);

type Repository<T> = {
  readAll: () => Promise<T[]>;
  write: (value: T) => Promise<IDBValidKey>;
};

export const exerciseRepository: Repository<object> = {
  readAll() {
    return readAll(db, Store.EXERCISES);
  },
  write(value) {
    return write(db, Store.EXERCISES, value);
  },
};
