import React from "react";
import { Col, Row } from "react-bootstrap";

// item, deleteItem, toggleComplete을 props로 받아서 사용
const TodoItem = ({item, deleteItem, toggleComplete}) => {
  return (
    <Row>
      <Col xs={12}>
        {/* isComplete에 따라 회색 처리 (item-complete 클래스) */}
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>
            {/* 삭제 버튼: 클릭 시 해당 item._id로 deleteItem 호출 */}
            <button className="button-delete" onClick={() => deleteItem(item._id)}>
              삭제
            </button>
            {/* 끝남/안끝남 버튼: 클릭 시 해당 item._id로 toggleComplete 호출, 텍스트는 상태에 따라 변경 */}
            <button className="button-delete" onClick={() => toggleComplete(item._id)}>
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
