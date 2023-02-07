
import { Post,Loader,FriendsList,CreatePost } from '../Components';
import Styles from '../Styles/Home.module.css';
import { useAuth ,usePosts} from '../Hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={Styles.home}>
      <div className={Styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
