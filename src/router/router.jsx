import { createBrowserRouter } from "react-router-dom";
import NotesPage from "../page/NotesPage";
import CreateNote from "../page/CreateNote";
import UpdateNote from "../page/UpdateNote";
import NotesById from "../page/NotesById";


const router = createBrowserRouter([
  {
    path: "/",
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
  }
  
]);

export default router;
