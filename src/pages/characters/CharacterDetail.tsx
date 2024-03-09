import { FC, useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { SiGooglemaps } from 'react-icons/si';
import { GiEarthAmerica } from 'react-icons/gi';
import { useParams, useNavigate } from 'react-router-dom';

import axiosClient from '@/apis/axios-client';
import { CharacterType } from '@/interfaces';

const initialCharacter: CharacterType = {
  id: 0,
  name: '',
  gender: '',
  image: '',
  location: {
    name: '',
    url: '',
  },
  origin: {
    name: '',
    url: '',
  },
  species: '',
  status: '',
};

const CharacterDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterType>(initialCharacter);

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`/character/${id}`)
      .then((response: CharacterType) => {
        setCharacter(response);
      })
      .catch(() => {});
  }, [id]);

  return (
    <div className="max-w-[800px] w-full px-4 sm:px-0 self-center">
      <Button
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate('/character')}
      >
        Back
      </Button>
      <Card
        sx={{
          width: '100%',
          height: 'fit-content',
          padding: 4,
          display: 'flex',
          columnGap: 6,
        }}
      >
        <Avatar
          alt={character.name}
          src={character.image}
          sx={{ width: 144, height: 144 }}
        />
        <div className="flex flex-col gap-y-2 grow">
          <div className="flex justify-between items-center w-full">
            <p className="font-medium text-[18px]">{character.name}</p>
            <span className="rounded-md border-1 border-gray-400 text-[12px] py-0.5 px-1.5 font-medium">
              {character.status}
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <p>{character.gender}</p>
            <span className="rounded-md border-1 border-gray-400 text-[12px] py-0.5 px-1.5 font-medium">
              {character.species}
            </span>
          </div>
          <div className="flex items-center w-full gap-x-2">
            <GiEarthAmerica />
            <p className="text-[14px] font-medium">{character.origin.name}</p>
          </div>
          <div className="flex items-center w-full gap-x-2">
            <SiGooglemaps />
            <p className="text-[14px] font-medium">{character.location.name}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CharacterDetail;
