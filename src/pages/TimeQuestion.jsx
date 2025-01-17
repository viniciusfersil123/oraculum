// src/pages/DayQuestion.jsx
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./TimeQuestion.css";

function DayQuestion() {
  const navigate = useNavigate();
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  const day = searchParams.get("day");
  const decade = searchParams.get("decade");
  const year = searchParams.get("year");

  const handleYes = () => {
    navigate(`/sign/${signName}/hour?day=${day}&decade=${decade}&year=${year}`);
  };

  const handleNo = () => {
    navigate(`/sign/${signName}/final?day=${day}&decade=${decade}&year=${year}`);
  };

  return (
    <div className="day-question">
      <h2>Can you tell me your time of birth?</h2>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
}

export default DayQuestion;
