import { observer } from "mobx-react";
import React from "react";
import { todosState } from "../todoState";

const FilterButton = observer((props) => {
  const { name } = props;
  const isPressed = todosState.filter === name;

  return (
    <button
      type="button"
      className={`btn filter ${isPressed && "checked"}`}
      aria-pressed={isPressed}
      onClick={() => todosState.setFilter(name)}
    >
      <span>{name}</span>
    </button>
  );
});

export default FilterButton;