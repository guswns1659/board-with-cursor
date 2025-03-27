import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface FormData {
  title: string;
  content: string;
  author: string;
}

const BoardWrite: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') !== null;
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: API 호출 구현
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          {isEdit ? '게시글 수정' : '게시글 작성'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="작성자"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="내용"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={10}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={() => navigate('/')}>
                  취소
                </Button>
                <Button variant="contained" type="submit">
                  {isEdit ? '수정하기' : '작성하기'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default BoardWrite; 