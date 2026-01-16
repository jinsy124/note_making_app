import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const NotesById = () => {
    const {id} = useParams();
    const [note,setNote] = useState(null);
    const [loading,setLoading]= useState (true);
    

    const fetchNotes =async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get(`/note/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNote(response.data);
            
        } catch (error) {
            console.error("Error fetching note",error);
        } finally {
            setLoading(false);
        }
        
    };
    useEffect (() => {
        fetchNotes();
        },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 ">
            
            <h1 className="text-3xl text-center font-serif mb-4 flex flex-col ">Note Details</h1>
            <Link to ="/" className="text-blue-500 hover:underline font-serif text-lg pt-4 mb-5">&larr; Go Back</Link>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto  mt-4">
                <h2 className="text-2xl font-serif mb-4">{note.title}</h2>
                <p className="text-gray-700 mb-4 font-serif">{note.content}</p>
    
            </div>
        </div>
    );
}
export default NotesById;