import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/filterButton.js";
import Todo from "./components/Todo";
import { todosState } from "./todoState";
import { observer } from "mobx-react";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = observer(() => {
  const tasks = todosState.todos;
  const filter = todosState.filter;

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => <Todo task={task} key={task.id} />);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <>
      <h1 className="title">Лист заданий</h1>
      <Form />
      <div className="buttons">{filterList}</div>
      <h2 id="counter" className="counter" tabIndex="-1">
        {headingText}
      </h2>
      <ul role="list" className="list" aria-labelledby="counter">
        {taskList}
      </ul>
    </>
  );
});

export default App;