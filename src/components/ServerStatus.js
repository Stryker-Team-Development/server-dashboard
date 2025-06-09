import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function ServerStatus({ sx = {} }) {
    const SERVER_STATUS_URL = process.env.REACT_APP_SERVER_STATUS_URL;
    const [serverStatus, setServerStatus] = useState({
        public_ip: null,
        state: '',
        loading: false,
        color: 'neutral',
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        getServerStatus();
        // eslint-disable-next-line
    }, []);

    function toggleServerState() {
        const valueToSet = isServerStopped(serverStatus.state) ? 'on' : 'off';
        setServerStatus({ ...serverStatus, loading: true });
        axios.post(SERVER_STATUS_URL + '/server/state', { state: valueToSet })
            .then((response) => response.data.success)
            .then(success => { if (success) getServerStatus(); })
            .catch((error) => { console.error('Error toggling server state:', error); });
    }

    function getServerStatus() {
        setServerStatus({ loading: true });
        axios.get(SERVER_STATUS_URL + '/server')
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

    function handleCopyIP() {
        if (serverStatus.public_ip) {
            navigator.clipboard.writeText(serverStatus.public_ip);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    }

    function getStateColor(state) {
        if (state === 'running') return '#4caf50'; // green
        if (state === 'stopped') return '#f44336'; // red
        return '#ff9800'; // orange for any other state
    }

    return (
        <Card 
            variant="outlined" 
            sx={{ 
                minWidth: 340,
                maxWidth: 400,
                bgcolor: '#2c2f36',
                borderRadius: 4,
                boxShadow: '0 2px 8px 0 #18191c',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...sx
            }}
        >
            <Typography level="h2" sx={{ mb: 2, color: '#f5f6fa', fontWeight: 600 }}>
                Server Status
            </Typography>
            <Card variant="soft" color={serverStatus.color} sx={{ width: '100%', minHeight: 80, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, bgcolor: '#23272f' }}>
                {serverStatus.loading ? (
                    <CircularProgress size="lg" color="neutral" />
                ) : (
                    <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography level="h4" sx={{ fontWeight: 500, textAlign: 'center', color: getStateColor(serverStatus.state) }}>
                            {serverStatus.state ? serverStatus.state.toUpperCase() : 'UNKNOWN'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5, width: '100%', flexDirection: 'row' }}>
                            <Typography level="body2" sx={{ color: '#b0b3b8', mr: 0.5, textAlign: 'center', fontSize: 18, fontWeight: 600 }}>
                                {isServerPendingOrStopping(serverStatus.state)
                                    ? 'Refreshing...'
                                    : serverStatus.public_ip}
                            </Typography>
                            {!isServerPendingOrStopping(serverStatus.state) && serverStatus.public_ip && (
                                <Tooltip title={copied ? 'Copied!' : 'Copy IP'} placement="top" variant="soft">
                                    <IconButton
                                        size="sm"
                                        color={copied ? 'success' : 'neutral'}
                                        onClick={handleCopyIP}
                                        sx={{ ml: 0.5 }}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
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
                    variant="solid"
                    color="info"
                    startDecorator={<RefreshIcon />}
                    onClick={getServerStatus}
                    disabled={serverStatus.loading}
                    sx={{ fontWeight: 600, color: '#fff', boxShadow: '0 2px 8px 0 #18191c', ':hover': { backgroundColor: 'rgb(35, 39, 47)', color: '#fff' } }}
                >
                    Refresh
                </Button>
            </Box>
        </Card>
    );
}
