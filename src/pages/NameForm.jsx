import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NameForm.css';
import config from './nameForm.json';

const NameForm = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate name input
        if (!name.trim()) {
            alert('Please enter your name.');
            return;
        }

        // Get the current URL parameters
        const searchParams = new URLSearchParams(location.search);

        // Add the name parameter to the URL
        searchParams.set('name', name);

        // Navigate to the final page with the updated URL
        const newUrl = `/sign/scorpio/final?${searchParams.toString()}`;
        navigate(newUrl);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <form className="name-container" onSubmit={handleSubmit}>
            <h2>{config.NameCTA}</h2>
            <label htmlFor="name-input">{config.title}</label>
            <input
                id="name-input"
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
            />
            <button className="submit-button" type="submit">
                Submit
            </button>
        </form>
    );
};

export default NameForm;
