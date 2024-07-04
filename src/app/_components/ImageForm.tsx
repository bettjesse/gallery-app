"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import FileUpload from "./file-upload"; 
import Link from "next/link";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(3,{message : "  Description is  required"}),
  pictureUrl: z.string().min(1, { message: "Image is required" }),
});

export const ImageForm = () => {
  const [ pictureUrl, setPictureUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditingImage, setIsEditingImage] = useState<boolean>(true);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const values = { title, description, pictureUrl };
      formSchema.parse(values); // Validate form values

      await axios.post(`/api/images`, values);

      // Reset form fields and image editing state after successful submission
      setTitle("");
      setDescription("");
      setPictureUrl("");
      setIsEditingImage(true);

      // Show success message
      toast.success('Post created successfully!');
      
      // Optionally, refresh the page or navigate to another route
      router.push('/'); // Example: Navigate back to home page
      router.refresh()
    } catch (error) {
      console.error("Error creating post", error);
      if (axios.isAxiosError(error)) {
        // Show error message for API request failure
        toast.error('Failed to create post. Please try again later.');
      } else if (error instanceof z.ZodError) {
        // Show validation error messages
        error.errors.forEach((err) => {
          if (err.path) {
            toast.error(err.message);
          }
        });
      } else {
        // Show generic error message for unexpected errors
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleImageUpload = (url?: string) => {
    if (url) {
      setPictureUrl(url);
      setIsEditingImage(false);
    }
  };

  return (
    <div className="w-full mx-auto  p-2">
    <Link href="/"
      
        className="flex items-center text-white text-sm mb-4"
      >
        < BsArrowLeft className="mr-2" />
        Back to Home
      </Link>
      <div className="w-full sm:w-3/4 mx-auto border border-[#3F3F3F] shadow-lg rounded-md p-3 sm:p-8 bg-[#292929]">
        
          <h2 className="text-xl font-semibold text-white">Add Picture</h2>
          <p className="text-xs text-gray-300">Share your moment with the community</p>
        
        <div className="mt-1">
          {isEditingImage ? (
            <FileUpload endpoint="galleryImage" onChange={handleImageUpload} />
          ) : (
            <>
              {pictureUrl && (
                <div className="relative mt-1 w-full h-36 sm:h-48 lg:h-56">
                  <Image
                    alt="Upload"
                    layout="fill"
                    className="object-cover rounded-md"
                    src={pictureUrl}
                  />
                </div>
              )}
              <button
                onClick={() => setIsEditingImage(true)}
                className="mt-2 px-4 py-2 bg-[#757575] text-white rounded-md focus:ring-offset-2"
              >
                Change Image
              </button>
            </>
          )}
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-white">
            Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-white rounded-md shadow-sm sm:text-sm text-black"
            value={title}
            placeholder="Fancy Amazing Picture"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-white">
            Description
          </label>
          <textarea
            className="mt-1 block w-full p-2 border border-white rounded-md shadow-sm sm:text-sm text-black"
            value={description}
            placeholder="Picture of an Amazing view, Blue Sky Polar Mountains..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-[#757575] text-white rounded-md focus:ring-offset-2"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};
