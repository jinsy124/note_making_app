import { useEffect, useState } from "react";
import api from "../api"
import { Link, useNavigate } from "react-router-dom";

const NotesLists = () => {
    
    const [listnotes,setListNotes] = useState([]);
    const navigate = useNavigate();
    const fetchNotes = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await api.get("/note/",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setListNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes",error);
        }
    };
    const deleteNotes = async (id) =>{
        try{
            const token = localStorage.getItem('token');
            let result  = confirm("Are you sure you want to delete this note?");
           
            if(!result) return;

            await api.delete(`/note/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchNotes();
        } catch(error) {
            console.error("Error deleting notes",error);
        } 
    };
    const handlelogout = async () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login');
            alert("please login with valid email and password")
        }
        fetchNotes();
    },[]);

    return(
        <div className="bg-gray-200 min-h-screen p-6">
            <header className="p-2 bg-blue-500 text-white   rounded mb-6 shadow-md border border-white-600">
                <h1 className="text-center text-2xl font-bold ">Notes Management App</h1>
            </header>
            <Link to="/" className="text-blue-600 hover:underline mb-6 self-start">
            &larr; Back</Link>
            <div className="flex justify-between  items-center mb-4 text-xl font-serif ">
            <h2 className="font-bold ">Notes List</h2>
            <div className="flex items-end gap-9">
            <Link to="/create">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"> CreateNote</button>
            </Link>
            <button onClick={handlelogout} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">Logout</button>
            </div>
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