

class IndexedDB {
  constructor(dbName, storeName, version) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
    this.db = null;
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version);
      request.onerror = event => {
        reject(request.error);
      };
      request.onsuccess = event => {
        this.db = event.target.result;
        resolve();
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async getData(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(key);
      request.onerror = event => {
        reject(request.error);
      };
      request.onsuccess = event => {
        resolve(event.target.result);
      };
    });
  }

  async setData(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.add(value, key);
      request.onerror = event => {
        reject(request.error);
      };
      request.onsuccess = event => {
        resolve();
      };
    });
  }

  async deleteData(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(key);
      request.onerror = event => {
        reject(request.error);
      };
      request.onsuccess = event => {
        resolve();
      };
    });
  }


  async getAllKeysOfStore(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      // Obtenir toutes les clés de l'objectStore
      const requestKeys = objectStore.getAllKeys();
      
      // En cas d'erreur
      requestKeys.onerror = function(event) {
        console.error("Erreur lors de la récupération des clés de la table", event.target.error);
        reject(event.target.error); 
      };
      
      // En cas de succès
      requestKeys.onsuccess = function(event) {
        const keys = requestKeys.result;
        resolve(keys); 
      };
    }); 
  }
}