import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
// Remove the duplicate import statement for 'SearchProvider'

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { router } from "./routes/router.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { CardProvider } from "./contexts/CardsContext.tsx";
import axios from "axios";
import { SearchProvider } from "./contexts/SearchContext.tsx";

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["x-auth-token"] = token
  }
  return req;
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ThemeProvider>
      <SearchProvider>
      <CardProvider>
        <RouterProvider router={router} />
      </CardProvider>
      </SearchProvider>
    </ThemeProvider>
  </AuthContextProvider>
);
