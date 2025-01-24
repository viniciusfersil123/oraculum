// src/pages/DayQuestion.jsx
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./TimeQuestion.css";
import config from "./timeQuestion.json";

function DayQuestion() {
  const navigate = useNavigate();
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const decade = searchParams.get("decade");
  const year = searchParams.get("year");

  const handleYes = () => {
    navigate(`/sign/${signName}/hour?day=${day}&month=${month}&decade=${decade}&year=${year}`);
  };

  const handleNo = () => {
    navigate(`/sign/${signName}/city?day=${day}&month=${month}&decade=${decade}&year=${year}`);
  };

  return (
    <div className="day-question">
      <h2>{config.question}</h2>
      <button className="time-button" onClick={handleYes}>Yes</button>
      <button className="time-button" onClick={handleNo}>No</button>
    </div>
  );
}

export default DayQuestion;
