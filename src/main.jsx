import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/context/theme-provider";

import "./index.css";

import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
<BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>    
</BrowserRouter>
);
