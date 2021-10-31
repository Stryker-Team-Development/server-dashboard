import { InputLabel, Input, Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_HOST } from '../../util/Constants'

function AddCharacterForm(props) {

    const [newCharacterName, setNewCharacterName] = useState("")
    const [newCharacterDescription, setNewCharacterDescription] = useState("")
    const [newCharacterImageUrl, setNewCharacterImageUrl] = useState("")

    async function addNewCharacter() {
        const createnewCharacterResult = await axios.post(`${API_HOST}/characters`, {
            name: newCharacterName,
            description: newCharacterDescription,
            imageUrl: newCharacterImageUrl
        })
        props.characters.push({
            id: createnewCharacterResult.id, 
            name: createnewCharacterResult.name,
            description: createnewCharacterResult.description, 
            imageUrl: createnewCharacterResult.imageUrl
        })
        props.setCampaigns([...props.characters]);
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1.5 },
                    width: '100%%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
                noValidate
                autoComplete="off"
            >
                <h2>BIG WIP<h2/>
                <InputLabel htmlFor="campaign-name-input">Campaign Name</InputLabel>
                <Input id="campaign-name-input" onChange={(event) => setNewCharacterName(event.target.value)} />
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <Input id="description=input" onChange={(event) => setNewCharacterDescription(event.target.value)} />
                <InputLabel htmlFor="image-url-input">Image URL</InputLabel>
                <Input id="image-url-input" onChange={(event) => setNewCharacterImageUrl(event.target.value)} />
                <Button variant='contained' color='primary' onClick={addNewCharacter}>Create!</Button>
            </Box>
        </>
    )
}

export default AddCharacterForm;
