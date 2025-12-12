/* d:/Projects/Ap-Bokifa-main/src/main.jsx */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ADDED

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CurrencyProvider>
    </BrowserRouter>{" "}
  </StrictMode>
);
