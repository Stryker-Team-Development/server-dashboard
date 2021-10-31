import Container from '@mui/material/Container';
import CampaignsList from '../components/CampaignsList';
import BackButton from '../components/BackButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../util/Constants'

function DnDPage() {

    const [campaigns, setCampaigns] = useState([]);
    const [isFirstCampaignFetch, setIsFirstCampaignFetch] = useState(true);

    useEffect(() => {
        async function getCampaigns() {
            const getCampaignsResult = await axios.get(`${API_HOST}/campaigns`);
            setCampaigns([...getCampaignsResult.data]);
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
