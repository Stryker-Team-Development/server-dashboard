import { Container, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../util/Constants'
import CharacterAttribute from './character/CharacterAttribute'
import CharacterHP from './character/CharacterHP'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function CharacterDetail(props) {

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
                <h2>Character</h2> {/* Replace for charactername */}
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Strength' value='12' modifier={1} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Dexterity' value='17' modifier={3} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Constitution' value='13' modifier={1} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Intelligence' value='8' modifier={-1} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Wisdom' value='15' modifier={2} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Charisma' value='10' modifier={0} />
                        </Grid>
                        <Grid item xs={1}>
                            <CharacterAttribute name='Proficiency' value='Bonus' modifier={2} />
                        </Grid>
                        <Grid item xs={2}>
                            <CharacterAttribute name='Walking' value='Speed' modifier={'35ft.'} />
                        </Grid>
                        <Grid item xs={3}>
                            <CharacterHP maxHp={20} currentHp={18} />
                            {/* <Item>HP</Item> */}
                        </Grid>
                        <Grid item xs={3}>
                            <Item>Saving Throws</Item>
                            <Item>Senses</Item>
                            <Item>Proficiencies & Languages</Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item>Skills</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2} columns={3}>
                                <Grid item xs={1}>
                                    <Item>Initiative</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>Armor Class</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>Defenses and Conditions</Item>
                                </Grid>
                            </Grid>
                            <Item>Ton of stuff</Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} columns={3}>

                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default CharacterDetail;