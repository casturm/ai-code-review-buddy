import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReview('');

    try {
      const response = await fetch('http://localhost:3001/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to get review');
      }

      const data = await response.json();
      setReview(data.review);
    } catch (err) {
      setError('Failed to get code review. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Code Review Buddy</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="code">Code to Review:</label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={10}
              placeholder="Paste your code here..."
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Getting Review...' : 'Get Review'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}
        
        {review && (
          <div className="review">
            <h2>Code Review</h2>
            <pre>{review}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
