// src/pages/TimeForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './TimeForm.css';
import config from './timeForm.json';

function TimeForm() {
    const { signName } = useParams();
    const [searchParams] = useSearchParams();
    const day = searchParams.get('day');
    const month = searchParams.get('month');
    const decade = searchParams.get('decade');
    const year = searchParams.get('year');
    const navigate = useNavigate();

    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [period, setPeriod] = useState('AM');

    const handleContinue = () => {
        navigate(`/sign/${signName}/city?day=${day}&month=${month}&decade=${decade}&year=${year}&hour=${hour}&minute=${minute}&period=${period}`);
    };

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    return (
        <div className="time-container">
            <p>
                {config.title}
            </p>

            <div className="time-selectors">
                <div className="dropdown-wrapper">
                    <select
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className="dropdown"
                    >
                        {hours.map((h) => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown-wrapper">
                    <select
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="dropdown-scrollable"
                    >
                        {minutes.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown-wrapper">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="dropdown"
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>

            <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
    );
}

export default TimeForm;