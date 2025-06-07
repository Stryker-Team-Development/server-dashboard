import ServerStatus from '../components/ServerStatus';
import YoutubeCard from '../components/YoutubeCard';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

function LandingPage() {
    return (
        <Sheet sx={{ minHeight: '100vh', bgcolor: '#23272f', p: 4 }}>
            <Typography level="h1" sx={{ mb: 4, color: '#f5f6fa', textAlign: 'center', fontWeight: 700 }}>
                Minecraft Server Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4, flexWrap: 'wrap' }}>
                <ServerStatus />
                <YoutubeCard />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Sheet variant="outlined" sx={{ bgcolor: '#2c2f36', borderRadius: 8, p: 2, minWidth: 320 }}>
                    <iframe
                        title="discord-iframe"
                        src="https://discord.com/widget?id=254270297899925514&theme=dark"
                        width="350"
                        height="390"
                        allowtransparency="true"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: 8 }}
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    />
                </Sheet>
            </Box>
        </Sheet>
    );
}

export default LandingPage;
