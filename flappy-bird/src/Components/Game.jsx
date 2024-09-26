import React, { useRef, useState, useEffect } from 'react';
import Bird from './Bird';
import './styles.css';
import Pipe from './Pipe';
import Counter from './Counter';
import Death from './Death';

function Game() {
  const [isFalling, setIsFalling] = useState(true);
  const [currentY, setCurrentY] = useState(0);
  const [isThere, setIsThere] = useState(false)
  const [isThereTwice, setIsThereTwice] = useState(false)
  const [pipePosition, setPipePosition] = useState(0)
  const [pipePositionTwice, setPipePositionTwice] = useState(0)
  const [pipePositionThird, setPipePositionThird] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const [point, setPoint] = useState(0)

  const ref = useRef([]); // Создаем реф для элемента
  const refTwice = useRef([]); // Создаем реф для элемента
  const refThird = useRef([]); // Создаем реф для элемента
  const birdRef = useRef()

    // Track passing status for each pipe
  const hasPassedPipe = useRef([false, false, false]); // Array for three pipes
  

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

 // Check if the bird has passed a pipe
 const getPoint = () => {
  if (birdRef.current) {
    const birdRect = birdRef.current.getBoundingClientRect();
    const pipeRefs = [ref.current[3], refTwice.current[3], refThird.current[3]];

    pipeRefs.forEach((pipe, index) => {
      if (pipe) {
        const pipeRect = pipe.getBoundingClientRect();

        // Check if the bird has passed the pipe
        if (birdRect.x > pipeRect.x + pipeRect.width && !hasPassedPipe.current[index]) {
          setPoint((prev) => prev + 1); // Increment score
          hasPassedPipe.current[index] = true; // Mark this pipe as passed
        }

        // Reset passing status when pipes go off-screen
        if (pipeRect.left < -50) {
          hasPassedPipe.current[index] = false; // Reset for next pass
        }
      }
    });
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
      getPoint()
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
      setCurrentY((prevY) => Math.max(prevY - 100, -250)); // Поднимаем птицу на 100 пикселей

      // Возобновляем падение через небольшую задержку
      setTimeout(() => {
        setIsFalling(true); // Возобновляем падение
      }, 120); // Задержка перед продолжением падения
    }
  };

  return (
    <>
    <div className='clickable-div' onClick={handleBackgroundClick}></div>
      <Counter point={point}></Counter>
      <div className='background'>
        <div className='background-layer background-layer-1'/>
        <div className='background-layer background-layer-2'/>
        <Pipe ref={ref} position_pipe_container={pipePosition}></Pipe>
        {isThere && <Pipe ref={refTwice} position_pipe_container={pipePositionTwice}></Pipe>} 
        {isThereTwice && <Pipe ref={refThird} position_pipe_container={pipePositionThird}></Pipe>} 
      </div>
      <Bird ref={birdRef} isFalling={isFalling} currentY={currentY} />   

    </>
  );
}

export default Game;