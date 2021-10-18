import Container from '@mui/material/Container';
import BackButton from '../components/BackButton';
import CharactersList from '../components/CharactersList'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

function CharactersPage () {

    let { campaignId } = useParams();
    const [characters, setCharacters] = useState([]);
    const [isFirstCharacter, setIsFirstCharacter] = useState(true);

    useEffect(() => {
        async function getCharacters() {
            // const getCampaignsResult = await axios.get('localhost:3002/campaigns/:campaignId/characters');
            setCharacters([{id: 1, name: "Danforth Redeye"}, {id: 2, name: "Alferan"}]);
            setIsFirstCharacter(false);
          }
          if (isFirstCharacter) getCharacters()
    }, [characters]);

    return (
        <>
            <BackButton/>

            <Container>
                <h2>Characters</h2>
                <CharactersList characters={characters} setCharacters={setCharacters}/>
            </Container>
        </>
    )
}

export default CharactersPage;