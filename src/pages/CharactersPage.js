import Container from '@mui/material/Container';
import BackButton from '../components/BackButton';
import CharactersList from '../components/CharactersList'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_HOST } from '../util/Constants'

function CharactersPage () {

    let { campaignId } = useParams();
    const [characters, setCharacters] = useState([]);
    const [isFirstCharacter, setIsFirstCharacter] = useState(true);

    useEffect(() => {
        async function getCharacters() {
            const getCharactersResult = await axios.get(`${API_HOST}/campaigns/${campaignId}/characters`);
            setCharacters(...getCharactersResult.data);
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