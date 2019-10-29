import React, { useState, useEffect } from "react";
import PostCard from "./postCard";
import axios from 'axios';


export default function PostList() {
  
  const postsApi = "http://localhost:5200/api/posts/"
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      axios.get(postsApi)
      .then (res => {debugger
          console.log(res)
          setPosts(res.data);
      })
      .catch (error => {
          alert('error getting posts')      
      })
      
  }, [])


  return (
    <div>
      {posts.map(post => {
        <PostCard 
        key={post.id}
        props={post}
        />;
      })}
    </div>
  );
}
