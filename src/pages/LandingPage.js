import ServerStatus from '../components/ServerStatus';
import RaiderIOListCard from '../components/RaiderIOCard';
import YoutubeCard from '../components/YoutubeCard';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const wowCharacters = [
    { name: 'Habuun', realm: 'Illidan', region: 'us' },
    { name: 'Sandevis', realm: 'Illidan', region: 'us' },
    { name: 'Vyoleht', realm: 'Lightbringer', region: 'us' },
    // Add more characters here as needed
];

function LandingPage() {
    const cardHeight = '250px';
    const cardWidth = '400px';
    
    return (
        <Sheet sx={{ minHeight: '100vh', bgcolor: '#23272f', p: 4 }}>
            <Typography level="h1" sx={{ mb: 4, color: '#f5f6fa', textAlign: 'center', fontWeight: 700 }}>
                Minecraft Server Dashboard
            </Typography>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                {/* Left Half */}
                <Grid xs={12} md={6} sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Sheet 
                        variant="outlined" 
                        sx={{ 
                            bgcolor: '#2c2f36', 
                            borderRadius: 8,
                            height: {
                                xs: cardHeight,
                                md: `calc(${cardHeight} * 4)` // Height of 3 cards + 2 gaps
                            },
                            width: cardWidth,
                            display: 'flex',
                            overflow: 'hidden',
                            p: 2
                        }}
                    >
                        <iframe
                            title="discord-iframe"
                            src="https://discord.com/widget?id=254270297899925514&theme=dark"
                            width="100%"
                            height="100%"
                            allowtransparency="true"
                            frameBorder="0"
                            style={{ border: 0, borderRadius: 8 }}
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                        />
                    </Sheet>
                </Grid>

                {/* Right Half - Stacked Cards */}
                <Grid xs={12} md={6} sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}>
                    <Box sx={{ 
                        width: cardWidth,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}>
                        <ServerStatus sx={{ height: cardHeight }} />
                        <YoutubeCard sx={{ height: cardHeight }} />
                        <RaiderIOListCard characters={wowCharacters} sx={{ height: cardHeight }} />
                    </Box>
                </Grid>
            </Grid>
        </Sheet>
    );
}

export default LandingPage;
