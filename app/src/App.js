import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const endpointIP = axios.create({ baseURL: "https://api.ipify.org" });

function App() {
  const [ip, setIp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      async function getPost() {
        const response = await endpointIP.get("/");
        setIp(response.data);
      }
      getPost();
    } catch (error) {
      setError(error);
    }
  }, []);

  if (!ip) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>IP is null.</h1>
        </header>
      </div>
    );
  } else if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>IP is unavailable.</h1>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{ip}</h1>
        </header>
      </div>
    );
  }
}

export default App;
