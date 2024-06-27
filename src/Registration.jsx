import { useState } from 'react';


function Registration() {
  const [registerResponse, setRegisterResponse] = useState(null);
  const [authResponse, setAuthResponse] = useState(null);

  const registerCompany = async () => {
    const url = 'http://20.244.56.144/test/register';
    const payload = {
      companyName: 'Afford Medical Technologies private limited',
      ownerName: 'Ayush Shrivastava',
      rollNo: '2102900100036',
      ownerEmail: 'ayush2021cs139@abesit.edu.in',
      accessCode: 'okDiPJ'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setRegisterResponse(data);
    } catch (error) {
      console.error("Error registering company:", error);
    }
  };

  const getAuthToken = async () => {
    const url = 'http://20.244.56.144/test/auth';
    const payload = {
      companyName: 'Afford Medical Technologies private limited',
      clientID: registerResponse.clientID,
      clientSecret: registerResponse.clientSecret,
      ownerName: 'Ayush Shrivastava',
      ownerEmail: 'ayush2021cs139@abesit.edu.in',
      rollNo: '2102900100036'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setAuthResponse(data);
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
  };

  return (
    <div className="Registration">
      <h1>Company Registration</h1>
      <button onClick={registerCompany}>Register Company</button>
      {registerResponse && (
        <div>
          <h2>Registration Response:</h2>
          <pre>{JSON.stringify(registerResponse, null, 2)}</pre>
        </div>
      )}

      <h1>Get Authorization Token</h1>
      {registerResponse && (
        <button onClick={getAuthToken}>Get Auth Token</button>
      )}
      {authResponse && (
        <div>
          <h2>Authorization Response:</h2>
          <pre>{JSON.stringify(authResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Registration;