import { Link } from 'react-router-dom';

import Styles from '../Styles/Home.module.css';
import { useAuth } from '../Hooks';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;
  console.log(auth.user);
  console.log(friends);

  return (
    <div className={Styles.friendsList}>
      <div className={Styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={Styles.noFriends}>NO friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link className={Styles.friendsItem} 
              to={{
                pathname: `/user/${friend.to_user._id}`,
                state: {
                  user: friend.to_user,
                },
              }}
            >
              <div className={Styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2922/2922561.png"
                  alt=""
                />
              </div>
              <div className={Styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
