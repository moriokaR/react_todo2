import React from "react";

const style = {
  backgroundColor: "#c6ffe2",
  width: "400px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px",
};



export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete, handleSortClick, } = props;
  return (
    <div style={style} className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <button onClick={() => handleSortClick()}>ソート</button>
      <ul>
        {todos.map((todo, index) => {
          const priotityStyle = {
            color: todo.priotity === "高" ? "red" : todo.priotity === "中" ? "blue" : "initial",
            fontWeight: "bold",
          }
          return (
            <li key={index}>
              <div className="list-row">
                <p>{todo.text}</p>
                <p style={priotityStyle}>{todo.priotity}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
