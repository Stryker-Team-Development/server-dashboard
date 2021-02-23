import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default function ServerStatus() {

    const [serverStatus, setServerStatus] = useState({
        public_ip: null,
        state: 'Please click Refresh button',
        loading: false
    });

    const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;

    function toggleServerState() {
        const valueToSet = isServerStopped() ? 'on' : 'off';
        setServerStatus({
            ...serverStatus,
            loading: true
        });
        axios.post(SERVER_STATUS_URL + '/state', {
            state: valueToSet
        }).then((response) => {
            if (response.data.success) {
                if (valueToSet === 'on') {
                    alert('Prendiendo esta monda');
                } else if (valueToSet === 'off') {
                    alert('Apagado la monda');
                }
                return true;
            } else {
                alert('Algo se fue a la verga, culpa de Alejo Ochoa');
                return false;
            }
        }).then(success => {
            if (success) {
                getServerStatus();
            }
        });
    }

    function getServerStatus() {
        setServerStatus({
            loading: true
        });
        axios.get(SERVER_STATUS_URL).then((response) => {
            setServerStatus({
                public_ip: response.data.public_ip,
                state: response.data.state,
                loading: false
            });
        });
    }

    function isServerStopped() {
        return serverStatus.state === 'stopped';
    }

    function isServerPendingOrStopping() {
        return serverStatus.state === 'pending' || serverStatus.state === 'stopping';
    }

    return (
        <div>
            <div>Valheim Server Status</div>
            <Card className='server-status' style={{ backgroundColor: (isServerPendingOrStopping() || isServerStopped()) === true ? "red" : "green" }}>
                {serverStatus.loading ?
                    <Loader type="Circles" color="#000000" height={80} width={80} /> :
                    <div>
                        {serverStatus.state.toUpperCase()}
                        <br />
                        {isServerPendingOrStopping() ? "Refrescate esa vaina a ver si ya" : serverStatus.public_ip}
                    </div>
                }
            </Card>
            <Button className='button'
                variant='primary'
                onClick={() => toggleServerState()}
                disabled={isServerPendingOrStopping() === true ? true : false}>
                {isServerStopped() ? 'Prender' : 'Apagar'}
            </Button>{' '}
            <Button className='button'
                variant='success'
                onClick={() => getServerStatus()}>
                Refrescar
            </Button>{' '}
        </div>
    );
}
