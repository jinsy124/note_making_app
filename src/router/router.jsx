import { createBrowserRouter } from "react-router-dom";
import NotesPage from "../page/NotesPage";
import CreateNote from "../page/CreateNote";
import UpdateNote from "../page/UpdateNote";
import NotesById from "../page/NotesById";
import SignUpPage from "../page/SignUpPage";
import Home from "../page/Home";
import LoginPage from "../page/LoginPage";
import { AuthProvider } from "../AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,   // ✅ Provider here
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
