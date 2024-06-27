import { useState, useEffect } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('p');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/http://localhost:9876/numbers/${numberId}`, {
        timeout: 500 // 500ms timeout
      });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred while fetching the numbers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, [numberId]);

  const handleIdChange = (event) => {
    setNumberId(event.target.value);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberId} onChange={handleIdChange}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={fetchNumbers} disabled={loading}>
        Fetch Numbers
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {result && (
        result && (
            <div>
              <h2>Result:</h2>
              <p>Previous Window State: {JSON.stringify(result.windowPrevState || [])}</p>
              <p>Current Window State: {JSON.stringify(result.windowCurrState || [])}</p>
              <p>Numbers Received: {JSON.stringify(result.numbers || [])}</p>
              <p>Average: {result.avg != null ? result.avg.toFixed(2) : 'N/A'}</p>
            </div>
          )
      )}
    </div>
  );
};

export default AverageCalculator;