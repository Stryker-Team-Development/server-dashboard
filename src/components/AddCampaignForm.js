import { InputLabel, Input, Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AddCampaignForm(props) {

    const [newCampaignName, setNewCampaignName] = useState("")
    const [newCampaignDescription, setNewCampaignDescription] = useState("")
    const [newCampaignImageUrl, setNewCampaignImageUrl] = useState("")

    useEffect(() => {}, props.setCampaigns)

    async function addNewCampaign() {
        // const createNewCampaignResult = await axios.post('localhost:3002/campaigns', {
        //     name: newCampaignName,
        //     description: newCampaignDescription,
        //     imageUrl: newCampaignImageUrl
        // })
        props.campaigns.push({
            id: 2, //newCampaignName
            description: 'Epic description', //newCampaignDescription
            imageUrl: 'Awesome Image Url' //newCampaignImageUrl
        })
        console.log(props.campaigns)
        props.setCampaigns(props.campaigns);
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
                <InputLabel htmlFor="campaign-name-input">Campaign Name</InputLabel>
                <Input id="campaign-name-input" onChange={(event) => setNewCampaignName(event.target.value)} />
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
