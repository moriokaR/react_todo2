import React from "react";

export const CompleteTodos = (props) => {
  const { todos, onClickBack, disabled } = props;

  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <div className="list-row">
                <p>{todo.text}</p>
                <button disabled={disabled} onClick={() => onClickBack(index)}>
                  戻す
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
