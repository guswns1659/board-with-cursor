import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
    name: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

interface BoardDetailProps {
  onBack: () => void;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  margin-right: 16px;
  
  &:hover {
    color: #333;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

interface AvatarProps {
  color: string;
}

const Avatar = styled.div<AvatarProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
`;

const PostTime = styled.span`
  font-size: 0.9rem;
  color: #757575;
  margin-top: 4px;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
`;

const PostContent = styled.div`
  color: #444;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 32px;
  white-space: pre-wrap;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #eee;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #757575;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #333;
  }
`;

const BoardDetail: React.FC<BoardDetailProps> = ({ onBack }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<Post | null>(null);

  const handleEdit = () => {
    // TODO: Implement edit functionality
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>
          <ArrowBackIcon />
        </BackButton>
      </Header>

      {post && (
        <Card>
          <UserInfo>
            <Avatar color={`#${Math.floor(Math.random()*16777215).toString(16)}`}>
              {post.author.name[0]}
            </Avatar>
            <UserMeta>
              <UserName>{post.author.name}</UserName>
              <PostTime>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ko })}
              </PostTime>
            </UserMeta>
          </UserInfo>

          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>

          <MetaInfo>
            <MetaItem>
              <FavoriteIcon fontSize="small" />
              {post.likes}
            </MetaItem>
            <MetaItem>
              <ChatBubbleOutlineIcon fontSize="small" />
              {post.comments}
            </MetaItem>
            <ActionButtons>
              <ActionButton onClick={handleEdit}>
                <EditIcon fontSize="small" />
                수정
              </ActionButton>
              <ActionButton onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
                삭제
              </ActionButton>
            </ActionButtons>
          </MetaInfo>
        </Card>
      )}
    </Container>
  );
};

export default BoardDetail; 