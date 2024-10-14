'use client';

import { useState } from 'react';
import axios from 'axios';

export function AskGpt() {
    // GET get all user
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            const response = await axios.post('http://127.0.0.1:5000/ask', {
                query: query,
            });
            const finalAnswer = response.data.answer;
            
            setAnswer(`${finalAnswer}`);
        } catch (error) {
            console.error('Error adding user:', error);
            setAnswer('Failed to add user.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>ChatGPT</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ask me any recipes you are interested!"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ height: '2rem', marginRight: '1rem', width: '30rem' }}
                    required
                />
                <button type="submit">Send</button>
            </form>
            {answer && <pre>{answer}</pre>}
        </div>
    );

}