import Card from 'react-bootstrap/Card';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ServerStatus from './components/ServerStatus'
import YoutubeCard from './components/YoutubeCard'

function App() {


  return (
    <div className='App'>
      <ServerStatus/>
      <Card className='mono-kakos-paragraph'>
        Kakos es gay y el mono es un caca LETSS GOOOOOOOOOOOOOOOOOOOOO
      </Card>
      <YoutubeCard/>
    </div>
  );
}

export default App;
