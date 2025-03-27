import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import Login from './pages/Login';
import Register from './pages/Register';
import { AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
    setIsEditing(false);
  };

  const handleBack = () => {
    setSelectedPostId(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
              <Typography 
                variant="h6" 
                component={Link} 
                to="/" 
                sx={{ 
                  flexGrow: 1, 
                  textDecoration: 'none', 
                  color: 'inherit',
                  fontWeight: 'bold'
                }}
              >
                게시판
              </Typography>
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body1">안녕하세요, {user.name}님!</Typography>
                  <Button color="inherit" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button color="inherit" component={Link} to="/login">
                    로그인
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    회원가입
                  </Button>
                </Box>
              )}
            </Toolbar>
          </AppBar>

          <Box sx={{ flex: 1, p: 3, maxWidth: '1200px', mx: 'auto', width: '100%' }}>
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/" /> : <Register />}
              />
              <Route
                path="/"
                element={
                  <BoardList
                    selectedPostId={selectedPostId}
                    onPostSelect={handlePostSelect}
                    isEditing={isEditing}
                    onBack={handleBack}
                  />
                }
              />
              <Route
                path="/post/:id"
                element={
                  selectedPostId ? (
                    <BoardDetail onBack={handleBack} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/write"
                element={
                  user ? (
                    <BoardWrite />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 