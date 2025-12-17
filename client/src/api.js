// client/mini-event-platform/src/api.js

// Use the port from your server (5000)
const API_URL = "http://localhost:5000"; 

export const api = {
  // This custom 'request' function matches the calls in Dashboard.js
  request: async (endpoint, method = "GET", body = null, token = null) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API Request failed");
      }

      return data;
    } catch (err) {
      // Pass the error up to the component
      throw err;
    }
  },
};