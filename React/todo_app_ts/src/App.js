import "./App.css";
import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList'
import NavBar from './components/NavBar';
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [listTodo, setListTodo] = useState([]);//upcoming tasks
  const [doneTodos, setDoneTodos] = useState([]);//completed tasks
  const [deletedTodos, setDeletedTodos] = useState([]);//deleted tasks
  const [activePage, setActivePage] = useState("upcoming");//current view
  const [showModal, setShowModal] = useState(false);//whether to show the edit modal
  const [modalData, setModalData] = useState({});//data for the modal
  const [modalIndex, setModalIndex] = useState(null);//index of the item being edited

  const addList = (newTodos) => {
    const todosWithId = newTodos.map((todo, index) => todo);
    setListTodo([...listTodo, ...todosWithId]);
    setShowModal(false);
  };
  
  useEffect(() => {
    const fetchTodo = async() => {
      const results = await axios.get("http://localhost:3000/todos")
      console.log(results);
      addList(results?.data)
    }
    fetchTodo()
  }, []);

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
              value={modalData.title}
              onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
            />
            <label>  Due Date : </label>
            <input
              type="date"
              value={modalData.dueDate && new Date(modalData.dueDate).toLocaleString()}
              onChange={(e) => setModalData({ ...modalData, dueDate: e.target.value })}
            />
            <label>Set Time : </label>
            <input
              type="time"
              value={modalData.setTime && new Date(modalData.setTime).toLocaleString()}
              onChange={(e) => setModalData({ ...modalData, setTime: e.target.value })}
            />
            <label>Note : </label>
            <textarea
              value={modalData.task}
              onChange={(e) => setModalData({ ...modalData, task: e.target.value })}
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
