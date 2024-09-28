import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bird from './Bird';
import { useBird } from './BirdContext';

function Store() {
  const { number, setNumber } = useBird();
  
  const navigate = useNavigate();

  const handleFirstClick = () => {
    setNumber(1); // Устанавливаем номер для красной птицы
  }

  const handleSecondClick = () => {
    setNumber(0); // Устанавливаем номер для красной птицы
  }

  return (
    <>
      <div className='hide'>
        <Bird />
      </div>

      <div className='store-page'>
        <button className='back' onClick={() => navigate('/')}>BACK</button>
        <div className='skins'>
          <div className='product'>
            <img src="./redbird1.png" alt="Special Bird" className='bird-image' />
            <h2 className='name'>Special Bird</h2>
            {number === 1 ? ( // Проверяем, куплена ли птица
              <button className='bought'>Bought</button>
            ) : (
              <button onClick={handleFirstClick} className='buy'>Buy</button> // Передаем функцию без вызова
            )}
          </div>

          <div className='product'>
            <img src="./bird1.png" alt="Special Bird" className='bird-image' />
            <h2 className='name'>Special Bird</h2>
            {number === 0 ? ( // Проверяем, куплена ли птица
              <button className='bought'>Bought</button>
            ) : (
              <button onClick={handleSecondClick} className='buy'>Buy</button> // Передаем функцию без вызова
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;