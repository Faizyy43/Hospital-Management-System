import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style/index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

// 🔑 Replace with your real Google Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const AppWrapper = () => (
  <BrowserRouter>
    <App />
    <Toaster position="top-right" />
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {GOOGLE_CLIENT_ID ? (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppWrapper />
      </GoogleOAuthProvider>
    ) : (
      <AppWrapper />
    )}
  </StrictMode>,
);
