import Styles from '../Styles/settings.module.css';
import { useState } from 'react';
import { useAuth } from '../Hooks';
import { Link ,useNavigate} from 'react-router-dom';

const Settings = () => {
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const navigate=useNavigate();

    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
      };

    const updateProfile = async () => {
        setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      alert('Please fill all the fields')

      error = true;
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password does not match');

      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log('settings response', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      return alert('User updated successfully');
    } else {
      alert(response.message);
    }
    setSavingForm(false);
    };

    if (!auth.user) {
      return  navigate("/");
    }

  return (
    <div className={Styles.settings}>
      <div className={Styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/219/219969.png"
          alt=""
        />
      </div>

      <div className={Styles.field}>
        <div className={Styles.fieldLabel}>Email</div>
        <div className={Styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={Styles.field}>
        <div className={Styles.fieldLabel}>Name</div>
        {editMode ?(
           <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
         /> 
        ):(
            <div className={Styles.fieldValue}>{auth.user?.name}</div>
        )}
    
      </div>
     {editMode &&(
      <>
      <div className={Styles.field}>
        <div className={Styles.fieldLabel}>Password</div>
        <input 
        type="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value) }
         />
      </div>

      <div className={Styles.field}>
        <div className={Styles.fieldLabel}>Confirm Password</div>
        <input type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
         />
      </div>
      </>
      )}

    <div className={Styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${Styles.saveBtn}`}
              onClick={updateProfile}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${Styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${Styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
