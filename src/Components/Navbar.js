import Styles from '../Styles/Navbar.module.css';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../Hooks';
import { searchUsers } from '../Api';

const Navbar = () => {

  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);



  return (
    <div className={Styles.nav}>
      <div className={Styles.leftDiv}>
        <Link to={"/"}>
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={Styles.searchContainer}>
        <img
          className={Styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={Styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={Styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6620/6620695.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>


      <div className={Styles.rightNav}>
        {auth.user &&(
        <div className={Styles.user}>
          <Link to="/settings">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2920/2920072.png"
              alt=""
              className={Styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div>
       )} 

        <div className={Styles.navLinks}>
          <ul>
            {auth.user ?(
              <>
            <li
              onClick={auth.logout}>Log out
            </li>
            </>
            ):(
              <>
            <li>
              <Link to="/Login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            </>
           ) }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
