import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ServerStatus() {
    const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;
    const [serverStatus, setServerStatus] = useState({
        public_ip: null,
        state: '',
        loading: false,
        color: 'neutral',
    });

    useEffect(() => {
        getServerStatus();
        // eslint-disable-next-line
    }, []);

    function toggleServerState() {
        const valueToSet = isServerStopped(serverStatus.state) ? 'on' : 'off';
        setServerStatus({ ...serverStatus, loading: true });
        axios.post(SERVER_STATUS_URL + '/state', { state: valueToSet })
            .then((response) => response.data.success)
            .then(success => { if (success) getServerStatus(); })
            .catch((error) => { console.error('Error toggling server state:', error); });
    }

    function getServerStatus() {
        setServerStatus({ loading: true });
        axios.get(SERVER_STATUS_URL)
            .then((response) => {
                setServerStatus({
                    public_ip: response.data.public_ip,
                    state: response.data.state,
                    loading: false,
                    color: getStatusColor(response.data.state),
                });
            })
            .catch((error) => { console.error('Error getting server status:', error); });
    }

    function getStatusColor(state) {
        if (isServerStopped(state)) return 'danger';
        if (isServerPendingOrStopping(state)) return 'warning';
        return 'success';
    }

    function isServerStopped(state) {
        return state === 'stopped';
    }

    function isServerPendingOrStopping(state) {
        return state === 'pending' || state === 'stopping';
    }

    return (
        <Card variant="outlined" sx={{ minWidth: 340, maxWidth: 400, bgcolor: '#2c2f36', borderRadius: 4, boxShadow: '0 2px 8px 0 #18191c', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography level="h2" sx={{ mb: 2, color: '#f5f6fa', fontWeight: 600 }}>
                Server Status
            </Typography>
            <Card variant="soft" color={serverStatus.color} sx={{ width: '100%', minHeight: 80, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, bgcolor: '#23272f' }}>
                {serverStatus.loading ? (
                    <CircularProgress size="lg" color="neutral" />
                ) : (
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography level="h4" sx={{ fontWeight: 500, color: '#f5f6fa' }}>
                            {serverStatus.state ? serverStatus.state.toUpperCase() : 'UNKNOWN'}
                        </Typography>
                        <Typography level="body2" sx={{ color: '#b0b3b8' }}>
                            {isServerPendingOrStopping(serverStatus.state)
                                ? 'Refreshing...'
                                : serverStatus.public_ip}
                        </Typography>
                    </Box>
                )}
            </Card>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                    variant="solid"
                    color={isServerStopped(serverStatus.state) ? 'success' : 'danger'}
                    startDecorator={<PowerSettingsNewIcon />}
                    onClick={toggleServerState}
                    disabled={isServerPendingOrStopping(serverStatus.state) || serverStatus.loading}
                >
                    {isServerStopped(serverStatus.state) ? 'Start' : 'Stop'}
                </Button>
                <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<RefreshIcon />}
                    onClick={getServerStatus}
                    disabled={serverStatus.loading}
                >
                    Refresh
                </Button>
            </Box>
        </Card>
    );
}
