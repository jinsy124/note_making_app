// router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import NotesPage from "../page/NotesPage";
import CreateNote from "../page/CreateNote";
import UpdateNote from "../page/UpdateNote";
import NotesById from "../page/NotesById";
import SignUpPage from "../page/SignUpPage";
import Home from "../page/Home";
import LoginPage from "../page/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../AuthContext";
import RootLayout from "../components/RootLayout"; // Create this component

const router = createBrowserRouter([
  {
    element: <RootLayout />, // Wrapper component
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/notes",
        element: (
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateNote />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notes/:id",
        element: (
          <ProtectedRoute>
            <NotesById />
          </ProtectedRoute>
        ),
      },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

export default router;