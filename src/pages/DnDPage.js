import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import {
    Link
} from "react-router-dom";

function DnDPage() {
    return (
        <div>
            <Link to='/'>
                <Button color='primary'>
                    {"< Go back"}
                </Button>
            </Link>

            <Container>
                <h2>Campaigns</h2>
                
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Lost Mines of Phandelver" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="The next Adventure!" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Icon sx={{ fontSize: 30, marginRight: 1  }}>add_circle</Icon>
                                <ListItemText primary="Add new Campaign!" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Container>
        </div>
    )
}

export default DnDPage;