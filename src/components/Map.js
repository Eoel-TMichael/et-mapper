import React, { useEffect, useState } from "react";
import MapboxGl, { Marker, Popup } from "react-map-gl";
import "./Map.css";

const Map = () => {
  const [mode, setMode] = useState("street");
  const [darkMode, setDarkMode] = useState(false);
  const [popup, setPopup] = useState({});
  const [buttonValue, setButtonValue] = useState("DarkMode");
  const [ready, setReady] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setMode("mapbox://styles/joelmeles/cklkep6t41e9z17w3pmcqbwn6");
    fetch("https://mapper-et.herokuapp.com/places")
      .then((result) => result.json())
      .then((data) => {
        setEntries(data);
        setReady(true);
        console.log(data);
      });
  }, []);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 9.16015,
    longitude: 40.49865,
    zoom: 6,
  });

  function toggleMode(btn) {
    setMode(btn);
    console.log(mode);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    darkMode ? setButtonValue("Street View") : setButtonValue("DarkMode");
    console.log(darkMode);
    darkMode
      ? toggleMode("mapbox://styles/joelmeles/ckjzh29090jh117t8ckqb89n4")
      : toggleMode("mapbox://styles/joelmeles/cklkep6t41e9z17w3pmcqbwn6");
    console.log(darkMode);
  }
  function togglePopup() {
    setPopup(!popup);
  }

  return (
    <div className="Map">
      <MapboxGl
        {...viewport}
        mapStyle={mode}
        mapboxApiAccessToken="pk.eyJ1Ijoiam9lbG1lbGVzIiwiYSI6ImNrbGh6cHI2cjFycWsycXA3eXYxYjQ4YzcifQ.ZcqGSe-PFyD3SPutobabFQ"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {ready &&
          entries.map((entry) => (
            <div
              key={entry._id}
              onClick={() => setPopup({ [entry._id]: true })}
            >
              <Marker
                key={entry._id}
                latitude={entry.latitude}
                longitude={entry.longitude}
                className="mark"
              >
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: `${4 * viewport.zoom}`,
                      height: `${4 * viewport.zoom}`,
                    }}
                    stroke="tomato"
                    stroke-width="1.5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="image"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </Marker>
              {popup[entry._id] ? (
                <Popup
                  key={entry.latitude}
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  altitude={-5}
                  className="popup"
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setPopup({})}
                  anchor="top"
                >
                  <div>
                    <h3>{entry.name}</h3>
                    <p>{entry.description}</p>
                    <small>
                      created At: {new Date(entry.createdDate).toUTCString()}
                    </small>
                  </div>
                </Popup>
              ) : null}
            </div>
          ))}
      </MapboxGl>
      <div className="darkmode">
        <button
          type="button"
          onClick={() =>
            toggleMode("mapbox://styles/joelmeles/cklkf6o4z1eqw17pgxc4q82uv")
          }
        >
          Sattilite View
        </button>
        <button type="button" onClick={() => toggleDarkMode()}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default Map;
