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
  
  // Function only operates while offline. Saves new transactions offline until the browser goes back online
  async function saveOfflineRecord( newTransaction ) {
    const trans = db.transaction("pending", "readwrite");
    const pendingTable = trans.objectStore("pending");
    pendingTable.add( newTransaction );
  
    await trans.done;
  
    console.log(`Saving new record offline: ` + JSON.stringify(newTransaction));
  }
  
  