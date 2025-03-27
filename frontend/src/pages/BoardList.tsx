import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';

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

interface BoardListProps {
  selectedPostId: number | null;
  onPostSelect: (postId: number) => void;
  isEditing: boolean;
  onBack: () => void;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: #000;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

interface AvatarProps {
  color: string;
}

const Avatar = styled.div<AvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #333;
`;

const PostTime = styled.span`
  font-size: 0.875rem;
  color: #757575;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

const PostContent = styled.p`
  color: #666;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #757575;
  font-size: 0.875rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BoardList: React.FC<BoardListProps> = ({ selectedPostId, onPostSelect, isEditing, onBack }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePostClick = (postId: number) => {
    onPostSelect(postId);
  };

  return (
    <Container>
      <Header>
        <Title>게시판</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleSearch}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchBar>
      </Header>

      <Grid>
        {posts.map((post) => (
          <Card key={post.id} onClick={() => handlePostClick(post.id)}>
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
            <PostMeta>
              <MetaItem>
                <FavoriteIcon fontSize="small" />
                {post.likes}
              </MetaItem>
              <MetaItem>
                <ChatBubbleOutlineIcon fontSize="small" />
                {post.comments}
              </MetaItem>
            </PostMeta>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default BoardList; 