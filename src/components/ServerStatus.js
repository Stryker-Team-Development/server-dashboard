import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default function ServerStatus() {

    const [serverStatus, setServerStatus] = useState({
        public_ip: null,
        state: 'Refrescalo!!',
        loading: false,
        color: 'yellow'
    });

    const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;

    function toggleServerState() {
        const valueToSet = isServerStopped(serverStatus.state) ? 'on' : 'off';
        setServerStatus({
            ...serverStatus,
            loading: true
        });
        axios.post(SERVER_STATUS_URL + '/state', {
            state: valueToSet
        }).then((response) => response.data.success).then(success => {
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
                loading: false,
                color: getStatusColor(response.data.state)
            });
        });
    }

    function getStatusColor(state) {
        if (isServerStopped(state)) {
           return 'red';
        } else if (isServerPendingOrStopping(state)) {
            return 'yellow';
        } else {
           return 'green';
        }
    }

    function isServerStopped(state) {
        return state === 'stopped';
    }

    function isServerPendingOrStopping(state) {
        return state === 'pending' || state === 'stopping';
    }

    return (
        <div>
            <div>Valheim Server Status</div>
            <Card className='server-status' style={{ backgroundColor: serverStatus.color }}>
                {serverStatus.loading ?
                    <Loader type="Circles" color="#000000" height={80} width={80} /> :
                    <div>
                        {serverStatus.state.toUpperCase()}
                        <br />
                        {isServerPendingOrStopping(serverStatus.state) ? "Refrescate esa vaina a ver si ya" : serverStatus.public_ip}
                    </div>
                }
            </Card>
            <Button className='button'
                variant='primary'
                onClick={() => toggleServerState()}
                disabled={isServerPendingOrStopping(serverStatus.state) === true ? true : false}>
                {isServerStopped(serverStatus.state) ? 'Prender' : 'Apagar'}
            </Button>{' '}
            <Button className='button'
                variant='success'
                onClick={() => getServerStatus()}>
                Refrescar
            </Button>{' '}
        </div>
    );
}
