import { InputLabel, Input, Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { API_HOST } from '../../util/Constants'

function AddCampaignForm(props) {

    const [title, setNewCampaignTitle] = useState("")
    const [description, setNewCampaignDescription] = useState("")
    const [imageUrl, setNewCampaignImageUrl] = useState("")

    async function addNewCampaign() {
        const createNewCampaignResult = await axios.post(`${API_HOST}/campaigns`, {
            title,
            description,
            imageUrl
        })
        props.campaigns.push({
            id: createNewCampaignResult.data.id, 
            title: createNewCampaignResult.data.title,
            description: createNewCampaignResult.data.description, 
            imageUrl: createNewCampaignResult.data.imageUrl 
        })
        props.setCampaigns([...props.campaigns]);
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
                <InputLabel htmlFor="campaign-title-input">Campaign Title</InputLabel>
                <Input id="campaign-title-input" onChange={(event) => setNewCampaignTitle(event.target.value)} />
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <Input id="description=input" onChange={(event) => setNewCampaignDescription(event.target.value)} />
                <InputLabel htmlFor="image-url-input">Image URL</InputLabel>
                <Input id="image-url-input" onChange={(event) => setNewCampaignImageUrl(event.target.value)} />
                <Button variant='contained' color='primary' onClick={addNewCampaign}>Create!</Button>
            </Box>
        </>
    )
}

export default AddCampaignForm;
