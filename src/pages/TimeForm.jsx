// src/pages/TimeForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './TimeForm.css';

function TimeForm() {
    const { signName } = useParams();
    const [searchParams] = useSearchParams();
    const day = searchParams.get('day');
    const decade = searchParams.get('decade');
    const year = searchParams.get('year');
    const navigate = useNavigate();

    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [period, setPeriod] = useState('AM');

    const handleContinue = () => {
        navigate(`/sign/${signName}/city?day=${day}&decade=${decade}&year=${year}&hour=${hour}&minute=${minute}&period=${period}`);
    };

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];

    return (
        <div className="time-container">
            <h2>Call Of Destiny</h2>
            <p>
                Pick the <strong><u>time you were born</u></strong> to see your chances of getting rich <br />
                <em>(An estimate will work)</em>
            </p>

            <div className="time-selectors">
                <select value={hour} onChange={(e) => setHour(e.target.value)}>
                    {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>

                <select value={minute} onChange={(e) => setMinute(e.target.value)}>
                    {minutes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>

            <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
    );
}

export default TimeForm;
