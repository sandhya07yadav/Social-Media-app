import PropTypes from 'prop-types';

import Styles from '../Styles/Home.module.css';

const Comment = ({ comment }) => {
  return (
    <div className={Styles.postCommentsItem}>
      <div className={Styles.postCommentHeader}>
        <span className={Styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={Styles.postCommentTime}>a minute ago</span>
        <span className={Styles.postCommentLikes}>22</span>
      </div>

      <div className={Styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
