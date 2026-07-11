import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./src/lib/firebase";

async function clear() {
  const snap = await getDocs(collection(db, "courses"));
  for (const item of snap.docs) {
    const title = item.data().title || "";
    // Keep only the valid ICA courses
    if (!title.toLowerCase().includes("tdi") && !title.toLowerCase().includes("membership")) {
        console.log("Deleting dummy course:", title);
        await deleteDoc(item.ref);
    }
  }
  console.log("Done");
  process.exit();
}
clear();
