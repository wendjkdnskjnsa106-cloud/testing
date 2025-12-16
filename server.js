const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Mock create video metadata + upload session
app.post('/videos', (req, res) => {
  // In real app: validate auth, create DB row, return upload session (presigned urls)
  const uploadId = uuidv4();
  res.json({
    uploadId,
    message: 'Mock upload session created. Integrate S3 presigned multipart or tus for real uploads.'
  });
});

// Mock manifest endpoint
app.get('/videos/:id/manifest.m3u8', (req, res) => {
  // In production: redirect to CDN-hosted manifest or serve signed URL
  res.type('text/plain');
  res.send(`#EXTM3U
# Mock HLS playlist
#EXT-X-VERSION:3
#EXTINF:10.0,
https://example-cdn.local/videos/${req.params.id}/1080p.ts
#EXTINF:10.0,
https://example-cdn.local/videos/${req.params.id}/720p.ts
`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));
