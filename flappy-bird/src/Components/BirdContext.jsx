import React, { createContext, useContext, useState } from 'react';

const BirdContext = createContext();

const images = [
  './bird1.png',
  './bird2.png',
  './bird3.png',
];

const red_images = [
  './redbird1.png',
  './redbird2.png',
  './redbird3.png',
];

export const BirdProvider = ({ children }) => {
  const [bought, setBought] = useState([images, red_images]);
  const [number, setNumber] = useState(0);
  const [numberBackground, setNumberBackground] = useState(0);
  const [countHeart, setCountHeart] = useState(1);

  return (
    <BirdContext.Provider value={{ bought, setBought, number, setNumber, countHeart, setCountHeart, numberBackground, setNumberBackground}}>
      {children}
    </BirdContext.Provider>
  );
};

export const useBird = () => {
  return useContext(BirdContext);
};