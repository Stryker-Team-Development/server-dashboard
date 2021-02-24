import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ServerStatus from './components/ServerStatus';
import YoutubeCard from './components/YoutubeCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainCard: {
    margin: '0 auto',
    whiteSpace: 'pre-line',
    display: 'flex',
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className='App'>
      <Container maxWidth="lg" >
      <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={5}>
            <ServerStatus className={classes.mainCard}/>
          </Grid>
          <Grid item xs={7}>
            <YoutubeCard className={classes.mainCard}/>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="false" >
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={5}>
          <iframe src="https://discord.com/widget?id=254270297899925514&theme=dark"
                  width="250"
                  height="390"
                  allowtransparency="true"
                  frameborder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
