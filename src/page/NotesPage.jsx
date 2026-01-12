import { useEffect, useState } from "react";
import api from "../api"
import { Link } from "react-router-dom";




const NotesLists = () => {
    
    const [listnotes,setListNotes] = useState([]);

    const fetchNotes = async () => {
        try{
            const response = await api.get("/");
            setListNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes",error);
        }
    };
    const deleteNotes = async (id) =>{
        try{
            let result  = confirm("Are you sure you want to delete this note?");
           
            if(!result) return;

            await api.delete(`${id}`);
            fetchNotes();
        } catch(error) {
            console.error("Error deleting notes",error);
        } 
    };
    

    useEffect(() => {
        fetchNotes();
    },[]);

    return(
        <div className="bg-gray-200 min-h-screen p-6">
            
            <header className="p-2 bg-blue-500 text-white   rounded mb-6 shadow-md border border-white-600">
                <h1 className="text-center text-2xl font-bold ">Notes Management App</h1>
            </header>
            <div className="flex justify-between  items-center mb-4 text-xl font-semibold   ">
            <h2 className="font-bold ">Notes List</h2>
            
            <Link to="/create">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"> CreateNote</button>
            </Link>
            
            </div>
            <ul className="grid gap-4 ">
                {listnotes.map((note,index) => (
                    <li key={index} className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold text-lg">
                    
                    <Link to = {`/notes/${note.id}`} className="hover:underline hover:bg-green-300 px-3">  {note.title}</Link>
                    </h2>
                    <div className="flex gap-4 font-medium m-2">
                    <Link to ={`/update/${note.id}`}>
                    <button className="bg-green-500 text-white px-3 py-1  rounded hover:bg-green-700">Edit</button>
                    </Link>
                    <br />
                    <button onClick={() => deleteNotes(note.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 ">Delete</button>
                    </div>
                    </li>

                ))}
            </ul>
            
        </div>
    );
};
export default NotesLists;