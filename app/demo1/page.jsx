"use client";

import React, { useState } from "react";

const ScamLocationConsent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      () => {
        setError("Location access denied or unavailable.");
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 border rounded-lg shadow text-center bg-yellow-50">
      <h1 className="text-2xl font-bold text-green-700 mb-3">
        🎉 You’ve Won a Free Gift!
      </h1>
      <p className="text-gray-700 mb-6">
        To verify delivery, we need access to your current location.
      </p>

      {!location ? (
        <>
          <button
            onClick={handleGetLocation}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Claim My Gift
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      ) : (
        <div className="mt-4 text-green-800">
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lng}</p>
          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            📍 Open in Google Maps
          </a>
          <p className="text-red-600 mt-6 font-semibold">
            ⚠️ This is a demo to show how easily websites can ask for your location.
            Never trust such prize claims blindly.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScamLocationConsent;
