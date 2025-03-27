import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostEditForm from './PostEditForm';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface PostDetailProps {
  postId: number;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBack }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/api/posts/${postId}/like`);
      setPost(prev => prev ? { ...prev, likesCount: prev.likesCount + 1 } : null);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    // 게시글 정보를 다시 불러옵니다
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>
        <PostEditForm
          postId={postId}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            수정
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            목록으로
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">작성자: {post.author}</p>
        <p className="text-gray-600">작성일: {new Date(post.createdAt).toLocaleString()}</p>
        <p className="text-gray-600">수정일: {new Date(post.updatedAt).toLocaleString()}</p>
      </div>
      <div className="prose max-w-none mb-4">
        <p>{post.content}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
        >
          <span>👍</span>
          <span>{post.likesCount}</span>
        </button>
        <div className="flex items-center space-x-1 text-gray-600">
          <span>💬</span>
          <span>{post.commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 