import React, { useState, useEffect } from "react";
import PostCard from "./postCard";
import axios from "axios";

export default function PostList(props) {
  const postsApi = "http://localhost:3100/api/posts/";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(postsApi)
      .then(res => {
        setPosts(res.data);
      })
      .catch(error => {
        alert("error getting posts");
      });
  }, []);

  return (
    <div className="posts">
      {posts.map(post => { 
        return <PostCard key={post.id} title={post.title} contents={post.contents} />;
      })}
    </div>
  );
}
