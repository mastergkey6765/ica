import { collection, getDocs } from "firebase/firestore";
import { db } from "./src/lib/firebase";

async function listEnrollments() {
  const snap = await getDocs(collection(db, "enrollments"));
  for (const item of snap.docs) {
    console.log("Enrollment found:", item.id, item.data().userId, item.data().courseId);
  }
  console.log("Done checking enrollments");
  process.exit();
}
listEnrollments();
