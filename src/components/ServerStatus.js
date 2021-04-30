import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    serverStatus: { 
        padding: '70px',
        width: '18rem',
        margin: '0 auto',
        whiteSpace: 'pre-line',
        display: 'flex',
      },
    button: {
        margin: '50px',
    },
    statusText: {
        textAlign: 'center',
        fontSize: 18,
        margin: 'auto'
    },
    card: {
        margin: 'auto',
        maxWidth: 720,
        height: 405,
        zIndex: 1,
        marginTop: 60,
        marginBottom: 60,
        border: '1px solid #d4d4d4',
        borderRadius: 0,
        webkitBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
        mozBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
        boxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);'
      }
  }));

export default function ServerStatus() {

    const classes = useStyles();

    const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;

    const [serverStatus, setServerStatus] = useState({
        public_ip: null,
        state: '',
        loading: false,
        color: ''
    });
    
    useEffect(() => {
        getServerStatus();
    }, []);

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
            <Card className={classNames(classes.card)}>
                <h1 className={classNames(classes.title)}>Valheim Server Status</h1>
                <Card className={classNames(classes.serverStatus)} style={{ backgroundColor: serverStatus.color }}>
                    {serverStatus.loading ?
                        <Loader type="Circles" color="#000000" height={35} width={35} style={{ margin: 'auto' }} /> :
                        <div className={classNames(classes.statusText)}>
                            {serverStatus.state.toUpperCase()}
                            <br />
                            {isServerPendingOrStopping(serverStatus.state) ? "Refrescate esa vaina a ver si ya" : serverStatus.public_ip}
                        </div>
                    }
                </Card>
                <Button className={classNames(classes.button)}
                    variant='contained'
                    color='primary'
                    onClick={() => toggleServerState()}
                    disabled={isServerPendingOrStopping(serverStatus.state) || serverStatus.loading  === true ? true : false}>
                    {isServerStopped(serverStatus.state) ? 'Prender' : 'Apagar'}
                </Button>{' '}
                <Button className={classNames(classes.button)}
                    variant='contained'
                    onClick={() => getServerStatus()}>
                    Refrescar
                </Button>{' '}
            </Card>
        </div>
    );
}
