import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/", {
        title,
        content
      });

      navigate("/"); // go back to notes list
    } catch (error) {
      console.error("Error creating note", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center ">
      <h2 className="font-bold text-3xl text-gray-800 mb-4">Create Note</h2>
      <Link to="/" className="text-blue-600 hover:underline mb-6 self-start">
      &larr; Back</Link>

      <form onSubmit={handleSubmit}
       className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          
          className="border border-gray-300 rounded px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />

        <button type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
