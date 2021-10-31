import Container from '@mui/material/Container';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../util/Constants'

function CharacterDetail() {

    let { campaignId, characterId } = useParams();

    useEffect(() => {
        async function getCharacterInfo() {
            const getCampaignsResult = await axios.get(`${API_HOST}/campaigns/${campaignId}/character/${characterId}`);
        }
    }, []);

    return (
        <>
            <BackButton />

            <Container>
                <h2>Character</h2>
            </Container>
        </>
    )
}

export default CharacterDetail;