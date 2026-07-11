import { collection, getDocs } from "firebase/firestore";
import { db } from "./src/lib/firebase";

async function list() {
  const snap = await getDocs(collection(db, "courses"));
  for (const item of snap.docs) {
    console.log("Course found:", item.id, item.data().title);
    console.log("Modules:", JSON.stringify(item.data().modules || []));
  }
  console.log("Done checking courses");
  process.exit();
}
list();
