import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FaHome, FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const BottomMenu = () => {
  const [value, setValue] = useState(0);

  const handleNavigation = (index: number) => {
    setValue(index);
    if (index === 0) {
      window.location.href = '/'; // Redirige vers la page d'accueil
    } else if (index === 1) {
      window.open('https://wa.me/2250565110441', '_blank'); // Ouvre WhatsApp
    } else if (index === 2) {
      window.open('https://www.youtube.com/@essohlewijeanmarc7832', '_blank'); // Ouvre YouTube
    } else if (index === 3) {
      window.open('tel:+2250788149044'); // Lance un appel téléphonique
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => handleNavigation(newValue)}
      showLabels // Permet de toujours afficher les labels
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#012537',
        zIndex: 30,
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <BottomNavigationAction
        label="Accueil"
        icon={<FaHome style={{ fontSize: '17px' }} />}
        sx={{
          color: 'white',
          '& .MuiBottomNavigationAction-label': {
            fontSize: '12px', // Taille du texte
            fontWeight: 700, // Texte en gras
          },
          '&.Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '12px', // Texte légèrement plus grand lorsqu'il est sélectionné
            fontWeight: 700, // Texte en gras
          },
        }}
      />
      <BottomNavigationAction
        label="WhatsApp"
        icon={<FaWhatsapp style={{ fontSize: '17px' }} />}
        sx={{
          color: 'white',
          '& .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
          '&.Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
        }}
      />
      <BottomNavigationAction
        label="YouTube"
        icon={<FaYoutube style={{ fontSize: '17px' }} />}
        sx={{
          color: 'white',
          '& .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
          '&.Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
        }}
      />
      <BottomNavigationAction
        label="Téléphone"
        icon={<FaPhone style={{ fontSize: '17px' }} />}
        sx={{
          color: 'white',
          '& .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
          '&.Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '12px',
            fontWeight: 700, // Texte en gras
          },
        }}
      />
    </BottomNavigation>
  );
};

export default BottomMenu;
