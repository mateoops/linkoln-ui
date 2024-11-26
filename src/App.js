import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import validator from 'validator'
import axios from 'axios';


export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (value) => {
    return validator.isURL(value, {require_protocol: true})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const response = await axios.post('http://localhost:8080/short/', {
        url,
      });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Enter URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
          error={error}
          helperText={error ? 'Please enter a valid URL including protocol.' : ''}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Shorten
        </Button>
      </Box>
      {shortUrl && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h6">Shortened URL:</Typography>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Box>
      )}
    </Container>
  );
};
