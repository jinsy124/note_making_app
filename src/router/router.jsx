import { createBrowserRouter } from "react-router-dom";
import NotesPage from "../page/NotesPage";
import CreateNote from "../page/CreateNote";
import UpdateNote from "../page/UpdateNote";
import NotesById from "../page/NotesById";
import SignUpPage from "../page/SignUpPage";
import Home from "../page/Home";
import LoginPage from "../page/LoginPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/notes",
    element: <NotesPage />
  },
  {
    path: "/create",
    element: <CreateNote />
  },
  {
    path: "/update/:id",
    element: <UpdateNote />
  },
  {
    path:"/notes/:id",
    element: <NotesById />
  },
  {
    path:"/signup",
    element: <SignUpPage />
  },
  {
    path:"/login",
    element: <LoginPage />
  },
  
  
]);

export default router;
