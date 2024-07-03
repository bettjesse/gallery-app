"use client"
import { useState } from "react";
import axios from "axios";
import { BsHeartFill  } from "react-icons/bs";

interface LikeButtonProps {
  postId: number;
  initialLiked: boolean;
}

const LikeButton = ({ postId, initialLiked }:LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeClick = async () => {
    try {
      await axios.post(`/api/like`, { postId });
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking post", error);
      // Handle error state if needed
    }
  };

  return (
    <div
      className="absolute bottom-4 right-4 cursor-pointer p-2 rounded-full "
      onClick={handleLikeClick}
    >
      <BsHeartFill className={`h-6 w-6 ${liked ? "text-[#D927C7]" : "text-white"}`} />
    </div>
  );
};

export default LikeButton;
