import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";


const UpdateNote = () => {
    const {id} =useParams();
    const [title,setTitle] = useState(" ");
    const [content,setContent] = useState(" ");
    
    
    const navigate = useNavigate();

    const fetchNote = async (e) => {
       try{
        
        const response = await api.get(`/note/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
       } catch (error ) {
        console.error("Error fetching note",error);
       }
    };
    useEffect (() => {
        fetchNote();
    },[id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            
            await api.patch(`/note/${id}`,{title,content});
            
            navigate("/notes");
        } catch (error) {
            console.error("Error updating note",error)
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="font-bold text-3xl text-gray-800 mb-4">Update Note</h2>
            <Link to="/" className="text-blue-600 hover:underline mb-6 self-start">
            &larr; Back</Link>
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col gap-4">
                <input value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <textarea value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>

            </form>

        </div>
    );     

};
export default UpdateNote;