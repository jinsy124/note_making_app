import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUpPage =() => {
    const navigate = useNavigate()

    const[formData ,setFormData] = useState({
        "username":"",
        "email":"",
        "password":"",
        "first_name":"",
        "last_name":"",

    });
    const[error,setError] = useState("")
    const[success,setSuccess] = useState("")

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,

        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || !formData.first_name || !formData.last_name){
            setError("please fill all required fields");
            return;
        }
        setError('');
        setSuccess('');


        try {
            await api.post("/auth/signup", {
                username:formData.username,
                email:formData.email,
                password:formData.password,
                first_name:formData.first_name,
                last_name:formData.last_name,

            });
            setSuccess("Account created successfully");
            setTimeout(() => {
                setSuccess("")
            },3000);
            setFormData({
                "username":"",
                "email":"",
                "password":"",
                "first_name":"",
                "last_name":"",
            });
            navigate('/')

        }catch (error) {
            if(error.response?.status === 422) {
                const errors = error.response.data.detail;
                const firstError = errors[0];
                setError(`${firstError.loc[1]}:${firstError.msg}`)
            } else if (error.response?.data?.message) {
                setError(error.response.data.message);
            }else{
                setError("Something went wrong please try again!!")
            }
            

            setTimeout(() => {
                setError("")
            },3000);
            setFormData({
                "username":"",
                "email":"",
                "password":"",
                "first_name":"",
                "last_name":"",
            });
        }
        
    };

    return(
        <div className="min-h-screen bg-gray-200 flex flex-col text-center ">
        
            <h1 className="font-serif text-center text-3xl p-7 mb-1 ">Create New Account</h1>
            
            {success && (
                <div className="mb-4  text-black px-4 py-3">
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-4 text-black px-4 py-3">
                    {error}
                </div>
            )}
                    
            <div className="flex items-center justify-center  ">
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-7 p-6 max-w-lg w-full rounded shadow justify-center bg-gray-700   ">
                    <input  
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                    className="p-3 rounded shadow-inner border border-blue-400 hover:border-blue-800 bg-black text-white font-serif"                    
                    />
                    <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    className="p-3 rounded shadow-inner border border-blue-400 hover:border-blue-800 bg-black text-white font-serif"
                    
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="p-3 rounded shadow-inner border border-blue-400 hover:border-blue-800 bg-black text-white font-serif "
                    />
                    <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={formData.first_name}
                    required
                    className="p-3 rounded shadow-inner border border-blue-400 hover:border-blue-800 bg-black text-white font-serif"
                    />
                    <input
                    type="text"
                    name="last_name"
                    placeholder="LastName"
                    onChange={handleChange}
                    value={formData.last_name}
                    required
                    className="p-3 rounded shadow-inner border border-blue-400 hover:border-blue-800 bg-black text-white font-serif"
                    />
                    <button type="submit" className="font-serif text-white border border-blue-400 hover:border-blue-800 bg-black p-2 focus:outline-none ring-2 ">signup</button>

                        
                    </form>
                </div>
        </div>
    )

}
export default SignUpPage