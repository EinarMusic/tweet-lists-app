import db from "../environments/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

async function setSaveList(save, user) {
  // await setDoc(doc(db, "save", save.name), {
  //   name: save.name,
  //   description: save.description,
  //   tweets: save.tweet,
  // });

  await setDoc(doc(db, "save", user), {
    name: save.name,
    description: save.description,
    tweets: save.tweet,
  });
}

async function getSaveList() {
  const save = [];

  const querySnapshot = await getDocs(collection(db, "save"));
  querySnapshot.forEach((doc) => {
    save.push(doc.data());
  });
  return save;
}

async function setTweetForSaveList(save) {
  const docRef = doc(db, "save", save.name);

  await updateDoc(docRef, {
    tweets: arrayUnion(save.tweet),
  });
}

/* if change the name will be change the name of the collection. 
    the problem is that only one time i can edit or make ref to the list that I edit. */
async function editSave(save) {
  const docRef = doc(db, "save", save.save_name);

  await updateDoc(docRef, {
    name: save.name,
    description: save.description,
  });
}

async function getASpecificSaveList(user) {
  const docRef = doc(db, "save", user);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

async function removeSave(save) {
  await deleteDoc(doc(db, "save", save.name));
}

export {
  setSaveList,
  getSaveList,
  setTweetForSaveList,
  editSave,
  getASpecificSaveList,
  removeSave,
};
