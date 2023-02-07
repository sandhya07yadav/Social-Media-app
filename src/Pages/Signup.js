import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { useToasts } from 'react-toast-notifications';

import { useAuth } from '../Hooks';
import Styles from '../Styles/Login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  //const { addToast } = useToasts();
  const auth = useAuth();
  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all the fields')
      error = true;
    }

    if (password !== confirmPassword) {
      alert('Make sure password and confirm password matches');

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      history('/Login');
      setSigningUp(false);
      console.log(response);
      console.log(auth.user);
      return alert('User registered successfully, please login now');
    } else {
      alert(response.message);
    }

    setSigningUp(false);
  };
  if (auth.user) {
    return <Link to="/" />;
  }
  return (
    <form className={Styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={Styles.loginSignupHeader}> Signup</span>
      <div className={Styles.field}>
        <input
          placeholder="Name"
          type="text"
          //required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={Styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={Styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
         // required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={Styles.field}>
        <input
          placeholder="Password"
          type="password"
          //required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={Styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
