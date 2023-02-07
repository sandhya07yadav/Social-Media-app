import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { createComment, toggleLike } from '../Api';
import { usePosts } from '../Hooks';
import Styles from '../Styles/Home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  console.log(post.user);

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        alert('Comment created successfully!');
      } else {
        alert(response.message);
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        alert('Like removed successfully!');
      } else {
        alert('Like added successfull');
      }
    } else {
      alert(response.message);
    }
  };

  return (
    <div className={Styles.postWrapper} key={post._id}>
      <div className={Styles.postHeader}>
        <div className={Styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={Styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={Styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={Styles.postContent}>{post.content}</div>

        <div className={Styles.postActions}>
          <div className={Styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3128/3128313.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={Styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={Styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={Styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
