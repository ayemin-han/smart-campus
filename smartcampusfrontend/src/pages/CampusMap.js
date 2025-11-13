// src/pages/CampusMap.js
import React, { useState, useCallback } from "react";
import { MapPin } from "lucide-react";
import { AIChatbotWrapper } from "../components/chatbot/AIChatbotWrapper";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const MFU_COORDS = { lat: 20.0448, lng: 99.8943 };

const CampusMap = () => {
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onMarkerClick = useCallback((markerData) => {
    setSelected(markerData);
  }, []);

  if (loadError)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px 0",
          fontSize: "1.1rem",
          color: "#444",
        }}
      >
        Map failed to load. Please check your API key.
      </div>
    );

  if (!isLoaded)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px 0",
          fontSize: "1.1rem",
          color: "#444",
        }}
      >
        Loading map...
      </div>
    );

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MapPin size={24} />
          Campus Map
        </h1>
        <p style={{ color: "#666", marginTop: 4 }}>
          Navigate around Mae Fah Luang University and find important places easily.
        </p>
      </div>

      <div
        className="section-card"
        style={{
          position: "relative",
          marginTop: 20,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "60vh",
            minHeight: "400px",
          }}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
            }}
            center={MFU_COORDS}
            zoom={15}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
            <Marker
              position={MFU_COORDS}
              onClick={() =>
                onMarkerClick({
                  title: "Mae Fah Luang University",
                  position: MFU_COORDS,
                })
              }
            />

            {selected && (
              <InfoWindow
                position={selected.position}
                onCloseClick={() => setSelected(null)}
              >
                <div style={{ maxWidth: 220 }}>
                  <h3 style={{ margin: "4px 0", fontSize: "1rem" }}>
                    {selected.title}
                  </h3>
                  <p style={{ margin: "0 0 6px 0", color: "#555" }}>
                    Mae Fah Luang University
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selected.position.lat},${selected.position.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: 500,
                    }}
                  >
                    Get directions →
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>

      <AIChatbotWrapper />
    </div>
  );
};

export default CampusMap;
