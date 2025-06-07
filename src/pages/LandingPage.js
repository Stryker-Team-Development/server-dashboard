import ServerStatus from '../components/ServerStatus';
import YoutubeCard from '../components/YoutubeCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    mainCard: {
        margin: '0 auto',
        whiteSpace: 'pre-line',
        display: 'flex',
    }
}));

function LandingPage() {

    const classes = useStyles();

    return (
        <div className='App'>
            <Container maxWidth="lg" >
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={5}>
                        <ServerStatus className={classes.mainCard} />
                    </Grid>
                    <Grid item xs={7}>
                        <YoutubeCard className={classes.mainCard} />
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="false" >
                <Grid container spacing={1} justify="center" alignItems="center">
                    <Grid item xs={7}>
                        <iframe
                            title="discord-iframe" 
                            src="https://discord.com/widget?id=254270297899925514&theme=dark"
                            width="250"
                            height="390"
                            allowtransparency="true"
                            frameborder="0"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
                    </Grid>
                    {/* <Grid item xs={3}>
                        <Link to='/DnD'>
                            <Button variant='contained' color='primary' style={{ padding: '75px' }}>
                                Dungeons and Dragons
                            </Button>
                        </Link>
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    )
}

export default LandingPage;
