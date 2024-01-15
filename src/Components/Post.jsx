const Post = ({ post }) => {
  return (
    <div className="post_task">
      <label>Title: </label> {post.title} <br />
      <label>Body: </label> {post.body} <br />
      <hr></hr>
    </div>
  );
};

export default Post;
