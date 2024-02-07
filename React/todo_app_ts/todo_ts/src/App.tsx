// App.tsx
import "./App.css";
import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList'
import NavBar from './components/NavBar';

interface Todo {
  taskTitle: string;
  dueDate: string | null;
  setTime: string | null;
  note: string;
  done?: boolean;
}

function App() {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [activePage, setActivePage] = useState<string>("upcoming");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Todo>({ taskTitle: '', dueDate: null, setTime: null, note: '' });
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const addList = (newTodo: Todo) => {
    setListTodo([...listTodo, { ...newTodo, done: false }]);
    setShowModal(false);
  };

  const deleteListItem = (key: number) => {
    let deletedItem = listTodo[key];
    setDeletedTodos([...deletedTodos, deletedItem]);
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  const markAsDone = (key: number) => {
    let doneItem = listTodo[key];
    doneItem.done = true;
    setDoneTodos([...doneTodos, doneItem]);
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  };

  const editItem = (key: number, editedTask: Todo) => {
    let updatedListTodo = [...listTodo];
    updatedListTodo[key] = editedTask;
    setListTodo(updatedListTodo);
    setShowModal(false);
  };

  const openModal = (index: number, data: Todo) => {
    setModalIndex(index);
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    setModalData({ taskTitle: '', dueDate: null, setTime: null, note: '' });
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
              <Todolist
                key={i}
                index={i}
                item={doneItem}
                // Add placeholder functions or remove unnecessary props based on your requirements
                deleteItem={() => {}}
                editItem={() => {}}
                openModal={() => {}}
              />
            ))}
          </>
        )}
      {activePage === 'deleted' && (
        <>
          <h1 className="app-heading">Deleted Todos</h1>
          <hr />
          {deletedTodos.map((deletedItem, i) => (
            <Todolist
              key={i}
              index={i}
              item={deletedItem}
              // Add placeholder functions or remove unnecessary props based on your requirements
              deleteItem={() => {}}
              editItem={() => {}}
              openModal={() => {}}
            />
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
              value={modalData.dueDate as string}
              onChange={(e) => setModalData({ ...modalData, dueDate: e.target.value })}
            />
            <label>Set Time : </label>
            <input
              type="time"
              value={modalData.setTime as string}
              onChange={(e) => setModalData({ ...modalData, setTime: e.target.value })}
            />
            <label>Note : </label>
            <textarea
              value={modalData.note}
              onChange={(e) => setModalData({ ...modalData, note: e.target.value })}
            ></textarea>
            <button onClick={() => editItem(modalIndex as number, modalData)}>&#10003;</button>
            <button onClick={closeModal}>&#x2716;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
