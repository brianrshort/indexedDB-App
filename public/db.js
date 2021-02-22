import { openDB } from 'https://unpkg.com/idb?module';

let db;

( async ()=> {
    db = await openDB("budget", 1, {
      upgrade(db) {
        const objectStore = db.createObjectStore("pending", {
          keyPath: "offlineId",
          autoIncrement: true 
          });
  
        console.log( `~ created the db/upgraded it:`, objectStore.name );
      } });
  })();
  
  