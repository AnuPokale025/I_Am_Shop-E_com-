import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Fix Leaflet marker issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const LocationModal = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setLoading(false);
      return;
    }

    setLoading(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPosition = [latitude, longitude];

        setPosition(newPosition);
        setPath((prev) => [...prev, newPosition]);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setError("Permission denied. Enable location in browser settings.");
        } else {
          setError("Unable to fetch location.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>📍 Live Tracker</h2>
          <button onClick={onClose} style={closeBtn}>✖</button>
        </div>

        {/* Status */}
        <div style={statusContainer}>
          {loading ? (
            <div style={statusWaiting}>⏳ Waiting for GPS...</div>
          ) : error ? (
            <div style={statusError}>❌ {error}</div>
          ) : (
            <div style={statusActive}>🟢 Tracking Active</div>
          )}
        </div>

        {/* Coordinates */}
        {position && (
          <div style={coordBox}>
            <div>
              <small>Latitude</small>
              <p>{position[0]}</p>
            </div>
            <div>
              <small>Longitude</small>
              <p>{position[1]}</p>
            </div>
          </div>
        )}

        {/* Map */}
        {position && (
          <MapContainer
            center={position}
            zoom={17}
            style={{ height: "280px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>You are here 📍</Popup>
            </Marker>
            <Polyline positions={path} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(8px)",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  width: "500px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  padding: "20px",
  color: "#fff",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer"
};

const statusContainer = {
  marginBottom: "15px"
};

const statusWaiting = {
  color: "#ffd166"
};

const statusError = {
  color: "#ff6b6b"
};

const statusActive = {
  color: "#06d6a0",
  fontWeight: "bold"
};

const coordBox = {
  display: "flex",
  justifyContent: "space-between",
  background: "rgba(255,255,255,0.2)",
  padding: "10px",
  borderRadius: "12px",
  marginBottom: "15px"
};

export default LocationModal;
