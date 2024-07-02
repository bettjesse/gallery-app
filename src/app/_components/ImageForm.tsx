

"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


import FileUpload from "./file-upload";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

export const ImageForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const values = { title, description, imageUrl };
      formSchema.parse(values); // Validate form values

      await axios.post(`/api/images`, values);

      router.refresh();
    } catch (error) {
      console.error("Something went wrong", error);

    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Create Post
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <FileUpload
          endpoint="galleryImage"
          onChange={(url) => {
            if (url) {
              setImageUrl(url);
            }
          }}
        />
        <div className="text-xs text-muted-foreground mt-4">
          16:9 aspect ratio recommended
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};
