import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const endpointIP = axios.create({ baseURL: "https://api.ipify.org" });
const endpointGeo = axios.create({ baseURL: "https://ipapi.co" });

function App() {
  const [error, setError] = useState(null);
  const [geo, setGeo] = useState(null);
  const [ipAddress, setipAddress] = useState(null);

  useEffect(() => {
    try {
      async function getIp() {
        const response = await endpointIP.get("/");
        setipAddress(response.data);
      }
      getIp();

      async function getGeo() {
        const response = await endpointGeo.get("/json");
        setGeo(response.data);
      }
      getGeo();
    } catch (error) {
      setError(error);
    }
  }, []);

  if (!ipAddress) {
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
          <h1>IP is unavailable. Error {error}</h1>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{ipAddress}</h1>
          <h1>{geo.org}</h1>
        </header>
      </div>
    );
  }
}

export default App;
