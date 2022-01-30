import db from "../environments/firebase.js";

function createNewList(formData) {
  db.collection("lists").add({
    name: formData.name,
    description: formData.description,
    users: formData.users
  });
}

function getLists() {
  const lists = [];
  db.collection("lists")
    .get()
    .then(querySnapshot => {
      lists.push(querySnapshot.docs.map(doc => doc.data()));
    });

  return lists;
}

function addUserOnList(listId) {
  //
}

function updateList(listId, data) {
  //
}

function deleteList(listId) {
  //
}

export { createNewList, getLists, addUserOnList, updateList, deleteList };
