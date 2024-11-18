import "./HistoryView.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function HistoryView({ setView }) {
  const answers = JSON.parse(localStorage.getItem("diary") || "{}");

  // object -> Array 하는 방법
  // 1. Object().keys(); -> ['18', '19'] key를 return
  // 2. Object.valuse(); -> ['adf, '123'] value를 return
  //  3. Object.entries() -> [['18', 'adf'], ['19', '123']] key-value 튜플을 return
  // 보통은 key를 반복시켜서 key에 대한 값을 가져오는 방식을 사용함

  // 2번 하는 방법
  // Object.keys(answers).map((key) => {
  //   const value = answers[key];
  //   key, value;
  //   return (
  //     <div>
  //       {key}: {value}
  //     </div>
  //   );
  // });

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="back-btn"
          onClick={() => {
            // MainView 화면으로 전환
            setView("main");
          }}
        >
          &lt;
        </button>
        <h4>다이어리 기록</h4>
      </div>
      {Object.entries(answers).map(([key, value]) => {
        console.log(value);
        return (
          <div key={key} className="diary-item">
            {/* 반복문에는 key 값을 저장해줘야 한다 */}
            <div className="diary-date">{key}일</div>
            <div>{value}</div>
          </div>
        );
      })}
    </>
  );
}
export default HistoryView;

HistoryView.propTypes = {
  setView: PropTypes.func,
};
