import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const Navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setUserToken(token);
    } else {
      const storedToken = localStorage.getItem("token");
      setUserToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate('/login'); // Redirect to login or landing page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {userToken ? (
        <>
          <h1>Welcome to the Home Page! 🎉</h1>
          <p>You are logged in with a valid token.</p>
          <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px" }}>
            Logout
          </button>
        </>
      ) : (
        <h2>Redirecting or not logged in...</h2>
      )}
    </div>
  );
};

export default Dashboard;