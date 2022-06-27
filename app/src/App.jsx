import "./App.css";
import axios from "axios";
import axiosRetry from "axios-retry";
import logo from "./logo.svg";
import { useState, useEffect } from "react";

const endpointIP = axios.create({ baseURL: "https://api.ipify.org" });
const endpointGeo = axios.create({ baseURL: "https://ipapi.co" });

/* https://stackoverflow.com/a/64096698/11986604 */
axiosRetry(endpointGeo, {
  retryCondition: (e) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(e) ||
      e.response.status === 429
    );
  },
  retryDelay: (retryCount, error) => {
    if (error.response) {
      const retry_after = error.response.headers["retry-after"];
      if (retry_after) {
        return retry_after;
      }
    }

    // Can also just return 0 here for no delay if one isn't specified
    return axiosRetry.exponentialDelay(retryCount);
  },
});

export default function App() {
  const [error, setError] = useState(null);
  const [geo, setGeo] = useState(null);
  const [ipAddress, setipAddress] = useState(null);

  useEffect(() => {
    try {
      getIp();
      getGeo();
    } catch (error) {
      setError(error);
    }
  }, []);

  /* GET request */
  const getIp = async () => {
    const response = await endpointIP.get("/");
    setipAddress(response.data);
  };

  const getGeo = async () => {
    const response = await endpointGeo.get("/json");
    setGeo(response.data);
  };

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
          <h1>Area of Country : {geo.country_area} sq. km.</h1>
          <h1>City : {geo.city}</h1>
          <h1>Continent Code : {geo.continent_code}</h1>
          <h1>Country Capital : {geo.country_capital}</h1>
          <h1>Country Code : {geo.country_code_iso3}</h1>
          <h1>Country Name : {geo.country_name}</h1>
          <h1>Country Population : {geo.country_population} people</h1>
          <h1>Currency : {geo.currency}</h1>
          <h1>Currency Name : {geo.currency_name}</h1>
          <h1>IPv4 : {ipAddress}</h1>
          <h1>IPv6 : {geo.ip}</h1>
          <h1>ISP : {geo.org}</h1>
          <h1>Languages : {geo.languages}</h1>
          <h1>Latitude : {geo.latitude}</h1>
          <h1>Longitude : {geo.longitude}</h1>
          <h1>State/Region : {geo.region}</h1>
          <h1>State/Region Code : {geo.region_code}</h1>
          <h1>Timezone : {geo.timezone}</h1>
          <h1>UTC : {geo.utc_offset}</h1>
        </header>
      </div>
    );
  }
}
