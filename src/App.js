
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [serverStatus, setServerStatus] = useState({
    ip: '127.0.0.1',
    isOn: false
  });

  const SERVER_STATUS_LAMBDA_URL = 'http://localhost:5000'
  const SERVER_TOGGLE_URL = 'http://localhost:5000'

  useEffect(() => {
    axios.get(SERVER_STATUS_LAMBDA_URL).then((response) => {
      setServerStatus({
        ip: response.data.serverUrl,
        isOn: response.data.isOn
      })
    });
  }, [serverStatus]);

  function toggleServerState() {
    axios.post(SERVER_TOGGLE_URL).then((response) => {
      setServerStatus({
        ip: response.data.serverUrl,
        isOn: response.data.isOn
      })
    })
  }

  return (
    <div className="App">
      <Card style={{ padding: "100px", width: "18rem", margin: "0 auto" }}>{serverStatus.ip}</Card>
      <Button style={{ margin: "50px" }}
        variant="primary"
        onClick={() => toggleServerState()}>
        {serverStatus.isOn ? "Turn off" : "Turn On"}
      </Button>{' '}
      <Card style={{ marginTop: "50px", padding: "100px", width: "50rem", margin: "0 auto" }}>
        Kakos es gay y el mono es un caca LETSS GOOOOOOOOOOOOOOOOOOOOO
        </Card>
    </div>
  );
}

export default App;
