import React, { useRef, useState, useEffect } from 'react';
import Bird from './Bird';
import './styles.css';
import Pipe from './Pipe';
import Counter from './Counter';
import { useNavigate } from 'react-router-dom';
import { useBird } from './BirdContext';

function Game() {
  const [isFalling, setIsFalling] = useState(true);
  const [currentY, setCurrentY] = useState(0);
  const [isThere, setIsThere] = useState(false);
  const [isThereTwice, setIsThereTwice] = useState(false);
  const [pipePosition, setPipePosition] = useState(0);
  const [pipePositionTwice, setPipePositionTwice] = useState(0);
  const [pipePositionThird, setPipePositionThird] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [point, setPoint] = useState(0);

  const {isBought} = useBird()
  const {countHeart, setCountHeart} = useBird()

  const navigate = useNavigate()

  const ref = useRef([]);
  const refTwice = useRef([]);
  const refThird = useRef([]);
  const birdRef = useRef();
  
  // Track passing status for each pipe
  const hasPassedPipe = useRef([false, false, false]);

  // Проверка выхода труб за пределы видимости
  const checkIfOutOfViewf = () => {
    if (ref.current[0]) {
      const rect = ref.current[0].getBoundingClientRect();
      if (rect.x < -45) {
        setPipePosition(generateRandomPipePosition());
      }
    }
  };

  // Проверка прохождения труб
  const getPoint = () => {
    if (birdRef.current) {
      const birdRect = birdRef.current.getBoundingClientRect();
      const pipeRefs = [ref.current[3], refTwice.current[3], refThird.current[3]];

      pipeRefs.forEach((pipe, index) => {
        if (pipe) {
          const pipeRect = pipe.getBoundingClientRect();
          if (birdRect.x > pipeRect.x && !hasPassedPipe.current[index]) {
            setPoint((prev) => prev + 1); // Увеличиваем счет
            hasPassedPipe.current[index] = true; // Отмечаем трубу как пройденную
          }

          if (pipeRect.x < -45) {
            hasPassedPipe.current[index] = false; // Сбрасываем статус при выходе трубы за экран
          }
        }
      });
    }
  };

  // Проверка столкновения между птицей и трубами
  const checkCollision = () => {
    if (birdRef.current) {
      const birdRect = birdRef.current.getBoundingClientRect();
      const pipeRefs = [
        ref.current[1], ref.current[2],
        refTwice.current[1], refTwice.current[2],
        refThird.current[1], refThird.current[2]
      ];

      for (const pipe of pipeRefs) {
        if (pipe) {
          const pipeRect = pipe.getBoundingClientRect();
          const isColliding =
            birdRect.x < pipeRect.x + pipeRect.width &&
            birdRect.x + birdRect.width > pipeRect.x &&
            birdRect.y < pipeRect.y + pipeRect.height &&
            birdRect.y + birdRect.height > pipeRect.y;

          if (isColliding) {
            setGameOver(true);
            break; // Выходим из цикла при первом столкновении
          }
        }
      }
    }
  };

  // Проверка выхода труб за пределы видимости
  const checkIfOutOfViewTwice = () => {
    if (refTwice.current[0]) {
      const rect = refTwice.current[0].getBoundingClientRect();
      if (rect.x < -45) {
        setPipePositionTwice(generateRandomPipePositionTwice());
      }
    }
  };

  const checkIfOutOfViewThird = () => {
    if (refThird.current[0]) {
      const rect = refThird.current[0].getBoundingClientRect();
      if (rect.x < -45) {
        setPipePositionThird(generateRandomPipePositionThird());
      }
    }
  };

  // Основной цикл обновления игры
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkIfOutOfViewf();
      checkIfOutOfViewTwice();
      checkIfOutOfViewThird();
      checkCollision();
      getPoint();
    }, 105);

    return () => clearInterval(intervalId);
  }, []);

  // Таймер для появления первой трубы
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThere(true); 
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // Таймер для появления второй трубы
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThereTwice(true); 
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Генерация случайной позиции трубы
  const generateRandomPipePosition = () => Math.floor(Math.random() * -200) - 50;
  
  // Генерация случайной позиции второй трубы
  const generateRandomPipePositionTwice = () => Math.floor(Math.random() * -200) - 50;

   // Генерация случайной позиции третьей трубы
   const generateRandomPipePositionThird = () => Math.floor(Math.random() * -200) - 50;

   // Падение птицы
   useEffect(() => {
     const fallInterval = setInterval(() => {
       if (isFalling) {
         setCurrentY((prevY) => Math.min(prevY + 16, window.innerHeight - 333));
       }
     }, 50);

     return () => clearInterval(fallInterval);
   }, [isFalling]);

   // Обработка клика по фону
   const handleBackgroundClick = () => {
     if (isFalling) {
       setIsFalling(false); 
       setCurrentY((prevY) => Math.max(prevY - 100, -250)); 

       // Возобновляем падение через небольшую задержку
       setTimeout(() => {
         setIsFalling(true); 
       }, 120); 
     }
   };

   // Обработка клика по кнопке "Arise"
   const handleAriseClick = () => {
     setIsThere(false);
     setIsThereTwice(false);
     setGameOver(false);

     setCountHeart((prev) => prev - 1)

     for (let i = 0; i < hasPassedPipe.current.length; i++) {
       hasPassedPipe.current[i] = false;
     }

     // Установка таймеров для появления труб с задержкой
     setTimeout(() => { 
       setIsThere(true); 
     }, 900);

     setTimeout(() => { 
       setIsThereTwice(true); 
     }, 1800);
   };

     // Функция для сброса состояния игры
  const resetGame = () => {
    setIsFalling(true);
    setCurrentY(0);
    setIsThere(false);
    setIsThereTwice(false);
    setPipePosition(0);
    setPipePositionTwice(0);
    setPipePositionThird(0);
    setGameOver(false);
    setPoint(0);

    // Сбрасываем статус прохождения труб
    hasPassedPipe.current.fill(false);

    // Запускаем таймеры для появления труб
    startPipes();
  };

  // Запуск таймеров для появления труб
  const startPipes = () => {
    setTimeout(() => {
      setIsThere(true); 
    }, 900);

    setTimeout(() => {
      setIsThereTwice(true); 
    }, 1800);
  };


   const store = () => navigate('/store')

   const { numberBackground } = useBird()

   return (
     <>
       {gameOver ?     
         <>
        <div className='heart-container'>
            <h1 className='count-of-heart'>{countHeart}</h1>
          <img className='heart-img' src="./heartimg.png" alt="heart" />
        </div>
           <div className='point-container'>
             <h1 className='point'>{point}</h1>      
           </div>
           <div className='death-screen'>
           <img src={numberBackground === 1 ? "./night.png" : './background.png'} alt='background' className='store-page'/>
             {countHeart === 0 ? <div></div> :
              <button className='arise' onClick={handleAriseClick}>Arise</button>}
              <button className='exit' onClick={resetGame}>Start</button>
              <button className='store' onClick={store}>Store</button>
           </div>
         </> : 
         <div>
           <div className='clickable-div' onClick={handleBackgroundClick}></div>
           <div className='heart-container'>
            <h1 className='count-of-heart'>{countHeart}</h1>
          <img className='heart-img' src="./heartimg.png" alt="heart" />
        </div>
           <Counter point={point}></Counter>
           <div className='background'>
            {numberBackground === 0 ? <div> <div className='background-layer background-layer-1'/>
             <div className='background-layer background-layer-2'/> </div> 
              : <div> <div className='backgroundnight-layer background-layer-1'/>
             <div className='backgroundnight-layer background-layer-2'/> </div>}

             <Pipe ref={ref} position_pipe_container={pipePosition}></Pipe>
             {isThere && <Pipe ref={refTwice} position_pipe_container={pipePositionTwice}></Pipe>} 
             {isThereTwice && <Pipe ref={refThird} position_pipe_container={pipePositionThird}></Pipe>} 
           </div>
           <Bird ref={birdRef} currentY={currentY} isFalling={isFalling} isBought={isBought} />      
         </div>}
     </>
   );
}

export default Game;