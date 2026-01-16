import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";


const LoginPage = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    

    const navigate = useNavigate( );
    const validateForm  = ( ) => {
        if (!email || !password ) {
            setError("username and password are required");
            return false;
        }
        setError(" ");
        return true;
    };
    const handleSubmit = async(e ) =>{
        e.preventDefault();
        if (!validateForm() )return;
        setLoading(true);

        
        try {
            const response = await api.post('/auth/login',{
                email:email,
                password:password
            });
            setLoading(false);
            
            localStorage.setItem('token',response.data.access_token);
            console.log('token')
            navigate('/notes')
           

            
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
        }    
    };
    return(
        
        <div className="min-h-screen bg-slate-300  ">
            <h1 className="font-serif text-4xl text-black p-9 text-center ">Login Page</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col border 
            justify-self-center items-center max-w-lg w-full border-white rounded shadow bg-slate-600">
                <div className="m-5">
                    
                    <input 
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-3 m-4 bg-black border  border-blue-400 hover:border-blue-800 text-white font-serif text-xl"
                    />
                </div>
                <div>
                    
                    <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-3 m-4 bg-black border  border-blue-400 hover:border-blue-800  text-white font-serif text-xl"
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="font-serif text-white border border-blue-400 hover:border-blue-800 bg-black px-5 focus:outline-none ring-2 mb-6 mt-4">
                    {loading ? 'Logging in....' : 'Login'}
                    </button>
                    {error && <p style={{color:'red'}}> {error}</p>}
                </div>
                
            </form>
        </div>
    ); 

}
export default LoginPage;