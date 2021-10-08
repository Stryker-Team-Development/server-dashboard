import Container from '@mui/material/Container';
import CampaignsList from '../components/CampaignsList';
import BackButton from '../components/BackButton';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DnDPage() {

    const [campaigns, setCampaigns] = useState([]);
    const [isFirstCampaignFetch, setIsFirstCampaignFetch] = useState(true);

    useEffect(() => {
        async function getCampaigns() {
            // const getCampaignsResult = await axios.get('localhost:3002/campaigns');
            setCampaigns([{id: 1, name: "Another campaign"}]);
            setIsFirstCampaignFetch(false);
          }
          if (isFirstCampaignFetch) getCampaigns()
    }, [campaigns]);

    return (
        <div>
            <BackButton/>

            <Container>
                <h2>Campaigns</h2>
                <CampaignsList campaigns={campaigns} setCampaigns={setCampaigns}/>
            </Container>
        </div>
    )
}

export default DnDPage;
