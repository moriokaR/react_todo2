import React, { useState } from "react";
import "./style.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import ReactFileReader from "react-file-reader";

export const App = () => {
  const uploadFile = (files) => {
    const read = new FileReader();
    read.onload = function (e) {
      alert(read.result);
    };
    read.readAsText(files[0]);
  };

  const [todoText, setTodoText] = useState("");
  const [priotity, setPriotity] = useState("-");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText == "") return;
    const todo = {
      text: todoText,
      priotity: priotity,
    };
    const newTodos = [...incompleteTodos, todo];
    setIncompleteTodos(newTodos);
    setTodoText("");
    setPriotity("-");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const handleSortClick = () => {
    const sortTodos = [...incompleteTodos];
    sortTodos.sort((a, b) => {
      if (a.priotity === "-" && b.priotity !== "-") return 1;
      if (a.priotity !== "-" && b.priotity === "-") return -1;
      if (a.priotity === "高" && b.priotity !== "高") return -1;
      if (a.priotity !== "高" && b.priotity === "高") return 1;
      if (a.priotity === "中" && b.priotity === "低") return -1;
      if (a.priotity === "低" && b.priotity === "中") return 1;
      return 0;
    });
    setIncompleteTodos(sortTodos);
  };

  return (
    <>
      <ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
        <button className="btn">Upload</button>
      </ReactFileReader>

      <InputTodo
        todoText={todoText}
        priotity={priotity}
        setPriotity={setPriotity}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 10}
      />

      {incompleteTodos.length >= 10 && (
        <p style={{ color: "red" }}>登録できるTODO10個まで！</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        handleSortClick={handleSortClick}
      />

      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
        disabled={incompleteTodos.length >= 10}
      />
    </>
  );
};
