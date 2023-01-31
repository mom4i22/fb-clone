import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { headers } from "next.config";
import { useDispatch } from "react-redux";
import { addPost } from "public/src/features/post-slice";

const CreatePost = () => {
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post/addPost";
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [imageToPost, setImageToPost] = useState(null);

  const inputRef = useRef();
  const hiddenFileInputRef = useRef();

  const uploadFileHandler = () => {
    hiddenFileInputRef.current.click();
  };

  const addImageToPostHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageToPost(e.target.result);
      };
    }
  };

  const deleteImageToPostHandler = (e) => {
    setImageToPost(null);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      return;
    }
    const formData = new FormData();
    formData.append("file", imageToPost);
    formData.append("post", inputRef.current.value);
    formData.append("name", session?.user.name);
    formData.append("email", session?.user.email);
    formData.append("profilePic", session?.user.image);

    axios
      .post(FACEBOOK_CLONE_ENDPOINT, formData, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        inputRef.current.value = "";
        dispatch(addPost(response.data));
        deleteImageToPostHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white rounded-md shadow-md text-gray-500 p-2">
      <div className="flex p-4 space-x-2 items-center">
        <Image
          src={session?.user.image}
          alt="user"
          height={50}
          width={50}
          className="rounded-full cursor-pointer"
        />
        <form className="flex flex-1">
          <input
            type="text"
            placeholder={`Share what's on your mind, ${
              session?.user.name.split(" ")[0]
            }`}
            ref={inputRef}
            className="rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4"
          />
          <button
            onClick={submitFormHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
          >
            Submit
          </button>
        </form>
      </div>

      {imageToPost && (
        <div
          onClick={deleteImageToPostHandler}
          className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"
        >
          <img src={imageToPost} className="h-10 object-contain" />
          <RiDeleteBin6Line className="h-8 hover:text-red-500" />
        </div>
      )}

      <div className="flex justify-evenly py-2">
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <HiOutlineVideoCamera size={20} className="text-red-500" />
          <p className="font-semibold text-gray-600">Live Video</p>
        </div>
        <div
          className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer"
          onClick={uploadFileHandler}
        >
          <IoMdPhotos size={20} className="text-green-500" />
          <p className="font-semibold text-gray-600">Upload Photo/Video</p>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={hiddenFileInputRef}
            onChange={addImageToPostHandler}
          />
        </div>
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <BsEmojiSmile size={20} className="text-yellow-500" />
          <p className="font-semibold text-gray-600">Emoji</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
