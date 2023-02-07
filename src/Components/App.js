
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from '../Hooks';
import { Home ,Login,Signup,Settings,UserProfile} from '../Pages';
import { Loader, Navbar } from './';





function App() {
  const auth = useAuth();
  



  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/register" element={<Signup/>} />
        <Route exact path="/settings" element={<Settings/>} />
        <Route exact path="/user/:userId" element={<UserProfile/>} />
      </Routes>
    </div>
  );
}

export default App;


