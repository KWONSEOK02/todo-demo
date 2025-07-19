import React from "react";
import TodoItem from "./TodoItem";

// todoList, deleteItem, toggleComplete을 props로 받아서 각 TodoItem에 전달
const TodoBoard = ({todoList, deleteItem, toggleComplete}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {/* 할 일 목록이 있으면 map으로 TodoItem 생성, 각 item에 함수 전달 */}
      {todoList.length > 0 ? todoList.map((item, index) => (
        <TodoItem
          item={item}
          key={index}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
        />
      )) : <h2>There is no Item to show</h2>}
    </div>
  );
};

export default TodoBoard;
