import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("rrrrrr", response);
    setTodoList(response.data.data);
  };
  
// 컴포넌트가 처음 마운트될 때 한 번 실행되는 useEffect
useEffect(() => {
  // 할 일 목록을 불러오는 비동기 함수 호출
  getTasks();
}, []); // 빈 배열 → 최초 1회만 실행됨 (컴포넌트 마운트 시)

const addTask = async () => {
  try {
    const response = await api.post("/tasks", {
      task: todoValue,
      isComplete: false,
    });

    if (response.status === 200) {
      console.log('성공');
      // 1. 입력한 값이 안사라짐
      setTodoValue('')
      // 2. 추가한 값이 안보임
      getTasks(); // 데이터 추가시 반영 데이터 받아오기기
    } else {
      throw new Error('task can not be added');
    }
  } catch (err) {
    console.log("error", err);
  }
};

// 할 일 완료 상태를 토글하는 함수 (완료/미완료 반전)
const toggleComplete = async (id) => {
  try {
    // id로 해당 task를 찾음
    const task = todoList.find((item) => item._id === id);
    // 완료 상태를 반전시켜 백엔드에 업데이트
    const response = await api.put(`/tasks/${id}`, {
      isComplete: !task.isComplete,
    });
    if (response.status === 200) {
      getTasks(); // 변경 후 목록 새로고침
    }
  } catch (error) {
    console.log("error", error);
  }
};

// 할 일 삭제 함수
const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    if (response.status === 200) {
      getTasks(); // 삭제 후 목록 새로고침
    }
  } catch (error) {
    console.log("error", error);
  }
};

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      {/* TodoBoard에 todoList, deleteItem, toggleComplete을 props로 전달 */}
      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;
