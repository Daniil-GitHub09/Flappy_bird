import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bird from './Bird';
import { useBird } from './BirdContext';

function Store() {
  const { number, setNumber, setCountHeart } = useBird();
  
  const navigate = useNavigate();

  const handleFirstClick = () => {
    setNumber(1); // Устанавливаем номер для красной птицы
  }

  const handleSecondClick = () => {
    setNumber(0); // Устанавливаем номер для красной птицы
  }

  const handleBuyOneHeart = () => {
    setCountHeart((prev) => prev + 1)
  }

  const handleBuyFiveHeart = () => {
    setCountHeart((prev) => prev + 5)
  }

  const { numberBackground, setNumberBackground } = useBird()

  const handleSkyBackground = () => {
    setNumberBackground(0)
  }

  const handleNightBackground = () => {
    setNumberBackground(1)
  }

  return (
    <>
      <div className='hide'>
        <Bird />
      </div>

      <img src={numberBackground === 1 ? "./night.png" : './background.png'} alt='background' className='store-page'/>
        <button className='back' onClick={() => navigate('/home')}>BACK</button>
        
        <div className="backgrounds">
          <div className="background-skin">
            <img src="./background.png" alt="sky" className='sky' />
            {numberBackground === 1 ? <button onClick={handleSkyBackground} className='buy'>Buy</button> : <button className='bought'>Bought</button>}
            
          </div>
          <div className="background-skin">
            <img src="./night.png" alt="sky" className='sky' />
            {numberBackground === 0 ? <button className='buy' onClick={handleNightBackground}>Buy</button> : <button className='bought'>Bought</button>}
          </div>
        </div>
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

        <div className='hearts'>
          <div className='plus-one'>
            <div>
              <img src="./heartimg.png" alt="heart" className='heart-buy'/>
              <span className='plus-text'>+1</span>            
            </div>

            <button onClick={handleBuyOneHeart} className='buy'>Buy</button>
          </div>
          <div className='plus-one'>
            <div>
              <img src="./heartimg.png" alt="heart" className='heart-buy'/>
              <span className='plus-text'>+5</span>            
            </div>

            <button onClick={handleBuyFiveHeart} className='buy'>Buy</button>
          </div>
        </div>
    </>
  );
}

export default Store;