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
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import EditProjectPage from "./pages/EditProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/project", element: <ProjectPage /> },
      { path: "/create-project", element: <CreateProjectPage /> },
      { path: "/edit-project/:slug", element: <EditProjectPage /> },
      { path: "/project/:slug", element: <ProjectPage />},
      { path: "/profile/:slug", element: <ProfilePage /> },
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
