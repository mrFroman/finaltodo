import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";

class TodosState {
  todos = [
    { id: "todo-0", name: "поесть", completed: true },
    { id: "todo-1", name: "поспать", completed: false },
    { id: "todo-2", name: "день сурка", completed: false }
  ];
  filter = "All";
  newTodoName = "";

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = (filter) => {
    this.filter = filter;
  };

  addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    todosState.todos.push(newTask);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTodoName } = this;

    if (!newTodoName.trim()) {
      return;
    }
    this.addTask(newTodoName);
    this.newTodoName = "";
  };

  handleNewTodoNameChange = (e) => {
    this.newTodoName = e.target.value;
  };

  toggleTaskCompleted = (task) => {
    task.completed = !task.completed;
  };

  deleteTask = (taskToRemove) => {
    todosState.todos = todosState.todos.filter((task) => task !== taskToRemove);
  };

  editTask = (task, newName) => {
    task.name = newName;
  };
}

export const todosState = new TodosState();
