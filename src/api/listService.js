import db from "../environments/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

async function setList(lists, user) {
  const docRef = doc(collection(db, user));
  //
  await setDoc(docRef, {
    id: docRef.id,
    descList: [{ name: lists.name, description: lists.description }],
    twOf: lists.users,
  });
}

async function getList(user) {
  const lists = [];

  const querySnapshot = await getDocs(collection(db, user));
  querySnapshot.forEach((doc) => {
    lists.push(doc.data());
  });

  return lists;
}
//
async function getASpecificList(list) {
  const docRef = doc(db, "lists", list.name);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

async function editList(user, listId, old, edit) {
  const docRef = doc(db, user, listId);

  await updateDoc(docRef, {
    descList: arrayRemove(old),
  });
  await updateDoc(docRef, {
    descList: arrayUnion(edit),
  });
}

async function addUsers(user, tw, listId) {
  const docRef = doc(db, user, listId);

  await updateDoc(docRef, {
    twOf: arrayUnion(tw),
  });
}

async function removeUser(user, usersDescription, listId) {
  const docRef = doc(db, user, listId);

  await updateDoc(docRef, {
    twOf: arrayRemove(usersDescription.username),
    userListDesc: arrayRemove(usersDescription),
  });
}

async function removeList(user, listId) {
  await deleteDoc(doc(db, user, listId));
}

export {
  setList,
  addUsers,
  getList,
  getASpecificList,
  editList,
  // addNewUserDescription,
  removeUser,
  removeList,
};
