import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function YoutubeCard({ sx = {} }) {
  let index = Math.floor(Math.random() * 12);
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        minWidth: 340, 
        maxWidth: 400, 
        bgcolor: '#2c2f36', 
        borderRadius: 4, 
        boxShadow: '0 2px 8px 0 #18191c', 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        ...sx
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, m: 0 }}>
        <iframe
          width="350"
          height="197"
          src={"https://www.youtube.com/embed/?listType=playlist&list=PLDiFgzzSZgFjVQgvBsNTuM8WoSh9WT9Sx&index=" + index}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Youtube Playlist"
          allowFullScreen
          style={{ borderRadius: 8, margin: 0, padding: 0 }}
        />
        <Typography level="body2" sx={{ mt: 1, mb: 0 }}>
          <a
            href="https://www.youtube.com/@kheps6234"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 600 }}
          >
            Visit the YouTube Channel
          </a>
        </Typography>
      </Box>
    </Card>
  );
}
