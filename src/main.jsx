import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contextApi/AuthContext.jsx";
import { DataContextProvider } from "./contextApi/DataContext.jsx";
import "./index.css";
import { router } from "./routes/Routes.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DataContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
