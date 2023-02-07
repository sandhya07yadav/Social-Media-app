import { useState ,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Loader } from '../Components';
import Styles from '../Styles/settings.module.css';
import { useAuth } from '../Hooks';
import { fetchUserProfile ,addFriend,removeFriend } from '../Api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const history = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      console.log(response);

      if (response.success) {
        setUser(response.data.user);
      } else {
        alert(response.message);
        return history('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, history]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
  if(friends){
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  }

    //return false;
  };

  const handleRemoveFriendClick = async() => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      alert('Friend removed successfully!');
    } else {
      alert(response.message,);
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      alert('Friend added successfully!');
    } else {
      alert(response.message);
    }
    setRequestInProgress(false);
  };

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
        <div className={Styles.fieldValue}>{user.email}</div>
      </div>

      <div className={Styles.field}>
        <div className={Styles.fieldLabel}>Name</div>

        <div className={Styles.fieldValue}>{user.name}</div>
      </div>

      <div className={Styles.btnGrp}>
        {checkIfUserIsAFriend() ?(
        <button 
        className={`button ${Styles.saveBtn}`}
        onClick={handleRemoveFriendClick}
        >{requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ):(
        <button 
        className={`button ${Styles.saveBtn}`}
        onClick={handleAddFriendClick}
        disabled={requestInProgress}
        >{requestInProgress ? 'Adding freind...':'Add freind'}</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
