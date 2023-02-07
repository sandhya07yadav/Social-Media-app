
import { useState } from 'react';
//import { redirect } from 'react-router-dom';
import Styles from '../Styles/Login.module.css';
import { useAuth } from '../Hooks';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email ,setEmail]= useState("")
    const [password, setPassword]=useState("")
    const [loggingIn,setLoggingIn]=useState(false)
    const auth = useAuth();
    console.log(auth);

    const handleSubmit = async (e)=>{
      e.preventDefault();
      setLoggingIn(true);

      if(!email || !password){
        return alert("Please enter email and Password");
    }

      const response = await auth.login(email, password);

      if (response.success) {
        console.log(response);
        alert('Successfully logged in')
      } else {
        alert(response.message)
      }
      setLoggingIn(false);
      
    };
    if (auth.user) {
      return  <Link to={"/"}></Link>;
    }
  
    return (
    <form className={Styles.loginForm} onSubmit={handleSubmit}>
      <span className={Styles.loginSignupHeader}>Log In</span>

      <div className={Styles.field}>
        <input type="email" placeholder="Email"   value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className={Styles.field}>
        <input type="password" placeholder="Paasword"  value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className={Styles.field}>
        <button disabled={loggingIn}>
            {loggingIn? "Logging In..." : "Log In"}</button>
      </div>
    </form>
  );
};

export default Login;
