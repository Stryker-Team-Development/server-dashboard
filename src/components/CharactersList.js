import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import AddCampaignForm from './forms/AddCampaignForm';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

function CharactersList(props) {

    const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);
    let history = useHistory();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                        <List>
                            {
                                props.characters.map(character =>
                                    <ListItem key={character.id} disablePadding>
                                        <Link to={`${history.location.pathname}/characters/${character.id}`}>
                                            <ListItemButton>
                                                <ListItemText primary={character.name} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                )
                            }
                            <ListItem>
                                <ListItemButton onClick={() => setShowNewCharacterForm(!showNewCharacterForm)}>
                                    <Icon sx={{ fontSize: 30, marginRight: 1 }}>add_circle</Icon>
                                    <ListItemText primary="Add new character to the campaign!" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box>
                        {
                            showNewCharacterForm ? <AddCampaignForm characters={props.characters} setCharacters={props.setCharacters} /> : null
                        }
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CharactersList;
