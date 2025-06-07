import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

export default function YoutubeCard() {
  let index = Math.floor(Math.random() * 12);
  return (
    <Card variant="outlined" sx={{ minWidth: 340, maxWidth: 400, bgcolor: '#2c2f36', borderRadius: 4, boxShadow: '0 2px 8px 0 #18191c', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <iframe
          width="350"
          height="197"
          src={"https://www.youtube.com/embed/?listType=playlist&list=PLDiFgzzSZgFjVQgvBsNTuM8WoSh9WT9Sx&index=" + index}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ borderRadius: 8 }}
        />
      </Box>
    </Card>
  );
}
