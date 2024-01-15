import Post from "./Post";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import { URLposts, getByUserId, addItem } from "../utils";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const getPosts = async () => {
    const { data } = await getByUserId(URLposts, userId);
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const changeStatus = () => {
    setShowAdd(!showAdd);
  };

  const addPost = async () => {
    const postsCopy = [...posts];
    postsCopy.push({ userId: userId, id: uuidv4(), ...newPost });

    setPosts(postsCopy);

    const { data } = await addItem(URLposts, { userId: userId, ...newPost });
    console.log(data);

    changeStatus();
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    <div>
      <h3 className="titleH3">Posts</h3>

      <button className="buttonAddT_P" onClick={changeStatus}>
        Add Post
      </button>

      <div style={{ display: showAdd ? "block" : "none" }}>
        <h2>New Post</h2>

        <label>Title: </label>
        <input name="title" type="text" onChange={handleChange} />

        <label>Body: </label>
        <input name="body" type="text" onChange={handleChange} />

        <button className="button buttonMargin" onClick={changeStatus}>
          Cancel
        </button>
        <button className="button buttonColor" onClick={addPost}>
          Add
        </button>
      </div>

      <div style={{ display: !showAdd ? "block" : "none" }}>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
