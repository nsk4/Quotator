import { writable, type Writable } from 'svelte/store';

const createLocalStorageStore = (key: string): Writable<number[]> => {
    const storedValue = localStorage.getItem(key);
    const value = storedValue ? JSON.parse(storedValue) : [];

    const store = writable<number[]>(value);

    store.subscribe(($store) => {
        localStorage.setItem(key, JSON.stringify($store));
    });

    // Listen for changes to localStorage in other tabs/windows
    window.addEventListener('storage', (event) => {
        console.log(event);
        if (event.key === key) {
            const updatedValue = event.newValue ? JSON.parse(event.newValue) : [];
            store.set(updatedValue); // Update the store reactively
        }
    });

    return store;
};

export const favouritesStore = createLocalStorageStore('favourites');
