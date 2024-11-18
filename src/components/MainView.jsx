import "./MainView.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function MainView({ setView }) {
  const now = new Date();
  const date = now.getDate(); // 오늘 날짜 가져오기
  const month = now.getMonth() + 1; // 오늘 달 가져오기
  const year = now.getFullYear(); // 올해 가져오기 fullyear = 2024 전체를 가져오겠다는 뜻

  const answers = JSON.parse(localStorage.getItem("diary") || "{}");

  const [questions, setQuestions] = useState(null);
  const [input, setInput] = useState(answers[date]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/hackurity01/simple-diary/main/src/questions.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      });
  }, []);

  // console.log(input); //input 확인용 나중에 성능이 좋아지면 오류 발생할수도 .. but 지금은 상관 x

  // {question[date]} 처리 방법 2 - question[date]를 받아오는 동안 null 화면(아무것도 없는 화면)이 보이게 하기
  // if (!question[date]) {
  //    null
  // }

  return (
    <>
      <div className="header">
        <div>
          {year}년 {month}월 {date}일
          {/* 내가 직접 자바스크립트로 string을 만들어서 하겠다 = {${year}년 ${month}월 ${date}일} */}
        </div>
        <div>
          <button
            className="history-btn"
            onClick={() => {
              setView("history");
            }}
          >
            기록 보기
          </button>
        </div>
      </div>
      <div className="question">
        {questions ? questions[date] : "질문을 불러오는 중..."}{" "}
        {/* {question[date]}만 적으면 question이 undefined 일 때 오류 발생 .. 그래서 없는 데이터를 처리할 방법 (1) */}
      </div>
      <div className="content">
        <textarea
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            window.localStorage.setItem(
              "diary",
              JSON.stringify({ ...answers, [date]: value }) //answers를 풀어서 넣어주면서 이전의 날짜도 저장되고, 오늘 날짜는 덮어써진다
            );
          }}
        />
      </div>
    </>
  );
}

export default MainView;

MainView.propTypes = {
  setView: PropTypes.func,
};
