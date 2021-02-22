
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [serverStatus, setServerStatus] = useState({
    public_ip: null,
    state: 'Please click Refresh button'
  });

  const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;

  function toggleServerState() {
    const valueToSet = isServerStopped() ? 'on' : 'off';
    axios.post(SERVER_STATUS_URL + '/state', {
      state: valueToSet
    }).then((response) => {
      if (response.data.success) {
        if (valueToSet === 'on') {
          alert('Prendiendo esta monda');
        } else if (valueToSet === 'off') {
          alert('Apagando la monda');
        }
      } else {
        alert('Algo se fue a la verga, culpa de Alejo Ochoa')
      }
    });
  }

  function getServerStatus() {
    axios.get(SERVER_STATUS_URL).then((response) => {
      setServerStatus({
        public_ip: response.data.public_ip,
        state: response.data.state
      })
    });
  }

  function isServerStopped() {
    return serverStatus.state === 'stopped';
  }

  function isServerPendingOrStopping() {
    return serverStatus.state === 'pending' || serverStatus.state === 'stopping';
  }

  return (
    <div className='App'>
      <Card className='server-status' style={{ backgroundColor: (isServerPendingOrStopping() || isServerStopped()) === true ? "red" : "green" }}>
        {serverStatus.state.toUpperCase()}
        <br />
        {serverStatus.public_ip}
      </Card>
      <Button className='button'
        variant='primary'
        onClick={() => toggleServerState()}
        disabled={isServerPendingOrStopping() === true ? true : false}>
        {isServerStopped() ? 'Turn On' : 'Turn Off'}
      </Button>{' '}
      <Button className='button'
        variant='success'
        onClick={() => getServerStatus()}>
        Refresh
      </Button>{' '}
      <Card className='mono-kakos-paragraph'>
        Kakos es gay y el mono es un caca LETSS GOOOOOOOOOOOOOOOOOOOOO
      </Card>
    </div>
  );
}

export default App;
