import "./App.css";
import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList'
import NavBar from './components/NavBar';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [activePage, setActivePage] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalIndex, setModalIndex] = useState(null);

  const addList = (newTodo) => {
    setListTodo([...listTodo, { ...newTodo, done: false }]);
    setShowModal(false);
  };

  const deleteListItem = (key) => {
    let deletedItem = listTodo[key];
    setDeletedTodos([...deletedTodos, deletedItem]);
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  const markAsDone = (key) => {
    let doneItem = listTodo[key];
    doneItem.done = true;
    setDoneTodos([...doneTodos, doneItem]);
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  const editItem = (key, editedTask) => {
    let updatedListTodo = [...listTodo];
    updatedListTodo[key] = editedTask;
    setListTodo(updatedListTodo);
    setShowModal(false);
  };

  const openModal = (index, data) => {
    setModalIndex(index);
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    setModalData({});
  };

  const deletedCount = deletedTodos.length;
  const upcomingCount = listTodo.length;

  return (
    <div className="main-container">
      <div className="top-right-corner">
        {deletedCount > 0 && (
          <div className="badge" onClick={() => setActivePage("deleted")}>
            <i className="fa-solid fa-trash-can"></i> {deletedCount}
          </div>
        )}
        {upcomingCount > 0 && (
          <div className="badge" onClick={() => setActivePage("upcoming")}>
            <i className="fa-solid fa-file"></i> {upcomingCount}
          </div>
        )}
      </div>
      <div className="center-container">
        <NavBar setActivePage={setActivePage} />

        {activePage === 'upcoming' && (
          <>
            <TodoInput addList={addList} />
            <h1 className="app-heading">Upcoming Todos</h1>
            <hr />
            {listTodo.map((listItem, i) => (
              <Todolist
                key={i}
                index={i}
                item={listItem} // Pass the entire todo object
                deleteItem={deleteListItem}
                markAsDone={markAsDone}
                editItem={editItem}
                showDeleteIcon
                openModal={openModal}
              />
            ))}
          </>
        )}

        {activePage === 'done' && (
          <>
            <h1 className="app-heading">Done Todos</h1>
            <hr />
            {doneTodos.map((doneItem, i) => (
              <Todolist key={i} index={i} item={doneItem} />
            ))}
          </>
        )}

        {activePage === 'deleted' && (
          <>
            <h1 className="app-heading">Deleted Todos</h1>
            <hr />
            {deletedTodos.map((deletedItem, i) => (
              <Todolist key={i} index={i} item={deletedItem} />
            ))}
          </>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <label>Task Title : </label>
            <input
              type="text"
              value={modalData.taskTitle}
              onChange={(e) => setModalData({ ...modalData, taskTitle: e.target.value })}
            />
            <label>  Due Date : </label>
            <input
              type="date"
              value={modalData.dueDate}
              onChange={(e) => setModalData({ ...modalData, dueDate: e.target.value })}
            />
            <label>Set Time : </label>
            <input
              type="time"
              value={modalData.setTime}
              onChange={(e) => setModalData({ ...modalData, setTime: e.target.value })}
            />
            <label>Note : </label>
            <textarea
              value={modalData.note}
              onChange={(e) => setModalData({ ...modalData, note: e.target.value })}
            ></textarea>
            <button onClick={() => editItem(modalIndex, modalData)}>&#10003;</button>
            <button onClick={closeModal}>&#x2716;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
