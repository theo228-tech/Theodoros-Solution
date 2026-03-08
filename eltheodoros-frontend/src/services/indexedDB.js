import { openDB } from 'idb';

const dbPromise = openDB('theodorosDB', 1, {
  upgrade(db) {
    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
  },
});

export const getLocalTasks = async () => (await dbPromise).getAll('tasks');
export const addLocalTask = async (task) => (await dbPromise).add('tasks', task);
export const updateLocalTask = async (task) => (await dbPromise).put('tasks', task);
export const deleteLocalTask = async (id) => (await dbPromise).delete('tasks', id);
export const clearLocalTasks = async () => (await dbPromise).clear('tasks');
