import React, { useRef, useState, useEffect } from 'react';
import Bird from './Bird';
import './styles.css';
import Pipe from './Pipe';

function Game() {
  const [isFalling, setIsFalling] = useState(true);
  const [currentY, setCurrentY] = useState(0);
  const [isThere, setIsThere] = useState(false)
  const [isThereTwice, setIsThereTwice] = useState(false)
  const [pipePosition, setPipePosition] = useState(0)
  const [pipePositionTwice, setPipePositionTwice] = useState(0)
  const [pipePositionThird, setPipePositionThird] = useState(0)
  const [gameOver, setGameOver] = useState(false);

  const ref = useRef([]); // Создаем реф для элемента
  const refTwice = useRef([]); // Создаем реф для элемента
  const refThird = useRef([]); // Создаем реф для элемента
  const birdRef = useRef()
  

  const checkIfOutOfViewf = () => {
      if (ref.current[0]) {
          const rect = ref.current[0].getBoundingClientRect();
          // Проверяем, вышел ли элемент за пределы видимости
          if (rect.left < -50) {
              // Элемент вышел за пределы экрана
              setPipePosition(generateRandomPipePosition())
          }
      }
  };

    // Проверка столкновения между птицей и трубами
    const checkCollision = () => {
      if (birdRef.current) {
        const birdRect = birdRef.current.getBoundingClientRect();
  
        // Проверка всех труб
        const pipeRefs = [ref.current[1], ref.current[2], refTwice.current[1], refTwice.current[2], refThird.current[1], refThird.current[2]];
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

  const checkIfOutOfViewTwice = () => {
      if (refTwice.current[0]) {
          const rect = refTwice.current[0].getBoundingClientRect();
          // Проверяем, вышел ли элемент за пределы видимости
          if (rect.left < -50) {
              // Элемент вышел за пределы экрана
              setPipePositionTwice(generateRandomPipePositionTwice())
          }
      }
  };

  const checkIfOutOfViewThird = () => {
      if (refThird.current[0]) {
          const rect = refThird.current[0].getBoundingClientRect();
          // Проверяем, вышел ли элемент за пределы видимости
          if (rect.left < -50) {
              // Элемент вышел за пределы экрана
              setPipePositionThird(generateRandomPipePositionThird())
          }
      }
  };

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkIfOutOfViewf()      
      checkIfOutOfViewTwice()
      checkIfOutOfViewThird()
      checkCollision()
    }, 120)

    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThere(true); // Устанавливаем состояние видимости в true
    }, 900);

    return () => clearTimeout(timer);
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThereTwice(true); // Устанавливаем состояние видимости в true
    }, 1800);

    return () => clearTimeout(timer);
  }, [])

  const generateRandomPipePosition = () => {
    const randomY = Math.floor(Math.random() * 200) + 10;

    return randomY * -1; // Возвращает случайную Y-координату для трубы
  };

  const generateRandomPipePositionTwice = () => {
    const randomY = Math.floor(Math.random() * 200) + 10;

    return randomY * -1; // Возвращает случайную Y-координату для трубы
  };

  const generateRandomPipePositionThird = () => {
    const randomY = Math.floor(Math.random() * 200) + 10;

    return randomY * -1; // Возвращает случайную Y-координату для трубы
  };

  useEffect(() => {
    const fall = () => {
      if (isFalling) {
        setCurrentY((prevY) => Math.min(prevY + 16, window.innerHeight - 333));
      }
    };

    const interval = setInterval(fall, 50);
    return () => clearInterval(interval);
  }, [isFalling]);

  const handleBackgroundClick = () => {
    if (isFalling) {
      setIsFalling(false); // Останавливаем падение
      setCurrentY((prevY) => Math.max(prevY - 120, -250)); // Поднимаем птицу на 120 пикселей

      // Возобновляем падение через небольшую задержку
      setTimeout(() => {
        setIsFalling(true); // Возобновляем падение
      }, 120); // Задержка перед продолжением падения
    }
  };

  return (
    <>
    {gameOver ? <div>Game Over</div> : 
    <div>
    <div className='clickable-div' onClick={handleBackgroundClick}></div>
      <div className='background'>
        <div className='background-layer background-layer-1'/>
        <div className='background-layer background-layer-2'/>
        <Pipe ref={ref} position_pipe_container={pipePosition}></Pipe>
        {isThere && <Pipe ref={refTwice} position_pipe_container={pipePositionTwice}></Pipe>} 
        {isThereTwice && <Pipe ref={refThird} position_pipe_container={pipePositionThird}></Pipe>} 
      </div>
      <Bird ref={birdRef} isFalling={isFalling} currentY={currentY} />      
    </div>}

    </>
  );
}

export default Game;