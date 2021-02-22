
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

  const SERVER_STATUS_URL = 'https://ljf7a447tk.execute-api.us-east-1.amazonaws.com/prod/server'

  function toggleServerState() {
    const valueToSet = isServerStopped() ? 'on' : 'off';
    axios.post(SERVER_STATUS_URL + '/state', {
      state: valueToSet
    }).then((response) => {
      alert((response.data.success && valueToSet === 'on') ? 'Prendiendo esta monda' : 'Algo se fue a la verga, culpa de Alejo Ochoa');
    })
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
      <Card style={{ padding: '70px', width: '18rem', margin: '0 auto', whiteSpace: 'pre-line', display: 'flex', backgroundColor: (isServerPendingOrStopping() || isServerStopped()) === true ? "red" : "green" }}>
      {serverStatus.state.toUpperCase()}
        <br />
        {serverStatus.public_ip}
      </Card>
      <Button style={{ margin: '50px' }}
        variant='primary'
        onClick={() => toggleServerState()}
        disabled={isServerPendingOrStopping() === true ? true : false}>
        {isServerStopped() ? 'Turn On' : 'Turn Off'}
      </Button>{' '}
      <Button style={{ margin: '50px' }}
        variant='success'
        onClick={() => getServerStatus()}>
        Refresh
      </Button>{' '}
      <Card style={{ marginTop: '50px', padding: '100px', width: '50rem', margin: '0 auto' }}>
        Kakos es gay y el mono es un caca LETSS GOOOOOOOOOOOOOOOOOOOOO
      </Card>
    </div>
  );
}

export default App;
