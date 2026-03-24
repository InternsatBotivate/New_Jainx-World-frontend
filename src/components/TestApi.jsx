import React, { useState } from 'react';

// Replace with your actual backend API endpoint
const API_BASE_URL = 'http://localhost:3000/api/compensation';

const TestApi = () => {
    const [partner, setPartner] = useState('JAINX_WORLD');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}?partner=${partner}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Test HP Compensation API</h1>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="partnerSelect">Select Partner: </label>
                <select
                    id="partnerSelect"
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                >
                    <option value="JAINX_WORLD">JAINX_WORLD</option>
                    <option value="JAINX_ITG">JAINX_ITG</option>
                </select>
                <button onClick={fetchData} style={{ padding: '5px 10px' }}>
                    Fetch Data
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {data && (
                <div>
                    <h2>Response Data</h2>
                    <pre
                        style={{
                            background: '#f4f4f4',
                            padding: '15px',
                            borderRadius: '5px',
                            overflow: 'auto',
                        }}
                    >
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TestApi;