import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import Layout from "./components/Layout";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserProvider from "./hooks/use-user-context";
import ProjectsPage from "./pages/ProjectsPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/project", element: <ProjectPage /> },
      { path: "/project/:slug", element: <ProjectPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
