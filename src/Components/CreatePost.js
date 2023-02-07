import { useState } from 'react';

import Styles from '../Styles/Home.module.css';
import { addPost } from '../Api';
import { usePosts } from '../Hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    // do some checks
    const response = await addPost(post);

    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      alert('Post created successfully');
    } else {
      alert(response.message,);
    }
    setAddingPost(false);
  };

  return (
    <div className={Styles.createPost}>
      <textarea
        className={Styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={Styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
