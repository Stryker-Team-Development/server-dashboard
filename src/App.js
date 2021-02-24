import Card from '@material-ui/core/Card';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ServerStatus from './components/ServerStatus';
import YoutubeCard from './components/YoutubeCard';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  mainCard: {
    margin: '0 auto',
    whiteSpace: 'pre-line',
    display: 'flex',
  },
  card: {
    margin: 'auto',
    maxWidth: 350,
    height: 20,
    zIndex: 1,
    marginTop: 25,
    border: '1px solid #d4d4d4',
    borderRadius: 0,
    webkitBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
    mozBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
    marginBottom: '50px',
    padding: '80px'
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className='App'>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={6}>
            <ServerStatus className={classes.mainCard}/>
          </Grid>
          <Grid item xs={6}>
            <YoutubeCard className={classes.mainCard}/>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="false" className={classes.container}>
        <Card className={classNames(classes.card)}>
          Kakos es gay y el mono es un caca LETSS GOOOOOOOOOOOOOOOOOOOOO
        </Card>
      </Container>
    </div>
  );
}

export default App;
