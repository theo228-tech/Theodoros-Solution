import { openDB } from 'idb';

const dbPromise = openDB('theodorosDB', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('tasks')) {
            db.createObjectStore('tasks', {
                keyPath: 'id',
                autoIncrement: true
            });
        }
    },
});

export const getLocalTasks = async () =>
    (await dbPromise).getAll('tasks');

export const addLocalTask = async (task) =>
    (await dbPromise).add('tasks', task);

export const clearLocalTasks = async () =>
    (await dbPromise).clear('tasks');
