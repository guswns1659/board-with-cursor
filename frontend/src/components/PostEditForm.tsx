import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PostEditFormProps {
  postId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const PostEditForm: React.FC<PostEditFormProps> = ({ postId, onSuccess, onCancel }) => {
  const [post, setPost] = useState<Post>({
    id: 0,
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/posts/${postId}`, post);
      onSuccess();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          작성자
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          수정
        </button>
      </div>
    </form>
  );
};

export default PostEditForm; 