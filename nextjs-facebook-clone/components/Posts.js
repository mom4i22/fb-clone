import { addAllPosts, selectPost } from "public/src/features/post-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import axios from "axios";

const Posts = () => {
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post/getPosts";
  const dispatch = useDispatch();

  const posts = useSelector(selectPost);

  useEffect(() => {
    const fetchData = () => {
      const response = axios.get(FACEBOOK_CLONE_ENDPOINT).then((response) => {
        console.log(response.data);
        dispatch(addAllPosts(response.data));
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        <Post post={post} />;
      })}
    </div>
  );
};

export default Posts;

// const Posts = () => {
//   const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post/getPosts";
//   const dispatch = useDispatch();
//   const posts = useSelector(selectPost);
//   useEffect(() => {
//     const fetchData = () => {
//       const response = axios.get(FACEBOOK_CLONE_ENDPOINT).then((response) => {
//         dispatch(addAllPosts(response.data));
//       });
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <Post post={post} key={post.id} />
//       ))}
//     </div>
//   );
// };

// export default Posts;
