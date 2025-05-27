import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NotionProvider from "./components/NotionProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotionProvider>
      <App />
    </NotionProvider>
  </StrictMode>
);
