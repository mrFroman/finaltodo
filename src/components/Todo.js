import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { todosState } from "../todoState";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

class TodoState {
  newName = "";
  isEditing = false;
  currentTask = null;

  constructor() {
    makeAutoObservable(this);
  }

  handleChange = (e) => {
    this.newName = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.newName.trim()) {
      return;
    }
    todosState.editTask(this.currentTask, this.newName);
    this.newName = "";
    this.isEditing = false;
  };

  setEditFalse = () => {
    this.isEditing = false;
  };

  setEditTrue = () => {
    this.isEditing = true;
  };

  toggleTaskCompleted = () => {
    todosState.toggleTaskCompleted(this.currentTask);
  };

  deleteTask = () => {
    todosState.deleteTask(this.currentTask);
  };
}

const Todo = observer((props) => {
  const { task } = props;
  const [state] = useState(() => new TodoState());
  state.currentTask = task;
  const { newName, isEditing } = state;

  const editingTemplate = (
    <form className="form" onSubmit={state.handleSubmit}>
      <input
        className="input"
        type="text"
        value={newName}
        onChange={state.handleChange}
        autoFocus
      />
      <button className="btn warning" onClick={state.setEditFalse}>
        Выход
      </button>
      <button type="submit" className="btn success">
        Сохранить
      </button>
    </form>
  );

  const viewTemplate = (
    <>
      <input
        id={task.id}
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={state.toggleTaskCompleted}
      />
      <label
        className={`text ${task.completed && "completed"}`}
        htmlFor={task.id}
      >
        {task.name}
      </label>
      <button
        className={`btn info ${task.completed && "disabled"}`}
        onClick={state.setEditTrue}
      >
        Обновить
      </button>
      <button type="button" className="btn danger" onClick={state.deleteTask}>
        Удалить
      </button>
    </>
  );

  return <li className="item">{isEditing ? editingTemplate : viewTemplate}</li>;
});

export default Todo;