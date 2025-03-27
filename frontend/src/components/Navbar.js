import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          게시판
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/write"
          >
            글쓰기
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 