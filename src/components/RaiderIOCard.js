import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ACCENT_COLOR = '#4fc3f7';
const API_KEY = process.env.REACT_APP_RAIDERIO_API_KEY;

function RaiderIOCard({ character }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://raider.io/api/v1/characters/profile`,
          {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            params: {
              region: character.region,
              realm: character.realm,
              name: character.name,
              fields: 'gear,raid_progression,mythic_plus_scores_by_season:current'
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load RaiderIO profile');
      }
      setLoading(false);
    }
    fetchProfile();
  }, [character]);

  if (loading) {
    return (
      <Box sx={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <CircularProgress size="md" color="neutral" />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box sx={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Typography color="danger">{error || 'No data'}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #444',
        ':last-child': { borderBottom: 'none' },
        transition: 'background 0.2s',
        '&:hover': { background: '#23272f' },
        minHeight: 80,
      }}
    >
      <Avatar src={profile.thumbnail_url} alt={profile.name} sx={{ width: 48, height: 48, border: `2px solid ${ACCENT_COLOR}` }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography level="body1" sx={{ color: '#f5f6fa', fontWeight: 600 }}>
          {profile.name} <span style={{ color: '#b0b3b8', fontWeight: 400 }}>({profile.active_spec_name})</span>
        </Typography>
        <Typography level="body2" sx={{ color: '#b0b3b8', fontWeight: 400 }}>
          iLvl: <b>{profile.gear.item_level_equipped}</b>
        </Typography>
        <Typography level="body2" sx={{ color: profile.mythic_plus_scores_by_season[0]?.segments.all.color || ACCENT_COLOR, fontWeight: 500 }}>
          Mythic+ Score: <b>{profile.mythic_plus_scores_by_season[0]?.segments.all.score}</b>
        </Typography>
        <Typography level="body2" sx={{ color: '#b0b3b8' }}>
          Raid Progression: <b>{profile.raid_progression['liberation-of-undermine'].summary}</b>
        </Typography>
      </Box>
      <Tooltip title="View on RaiderIO" placement="left" variant="soft">
        <IconButton
          component="a"
          href={profile.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ ml: 2, color: ACCENT_COLOR, bgcolor: 'rgba(79,195,247,0.08)', ':hover': { bgcolor: 'rgba(79,195,247,0.18)' } }}
        >
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function RaiderIOListCard({ characters }) {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        bgcolor: '#2c2f36', 
        borderRadius: 8, 
        p: 0, 
        minWidth: 320, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0, 
        height: '100%',
      }}
    >
      {characters.map((char, idx) => (
        <RaiderIOCard key={char.name + char.realm + char.region} character={char} />
      ))}
    </Card>
  );
}
