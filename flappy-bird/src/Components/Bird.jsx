import React, { useEffect, useState, forwardRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useBird } from './BirdContext'; // Импортируем контекст

const Bird = forwardRef(({ isFalling, currentY }, ref) => {
  const { bought, number } = useBird(); // Извлекаем данные из контекста
  const [imageIndex, setImageIndex] = useState(0);

  const imagesToUse = bought[number] || []; // Получаем массив изображений в зависимости от number

  const props = useSpring({
    to: {
      transform: `translateY(${currentY}px) rotate(${isFalling ? '40deg' : '-60deg'})`,
    },
    config: { tension: 350, friction: 50 },
  });

  useEffect(() => {
    if (!isFalling) {
      setImageIndex(1);
      const timer = setTimeout(() => {
        setImageIndex(2);
      }, 90);
      return () => clearTimeout(timer);
    } else {
      setImageIndex(0);
    }
  }, [isFalling]);

  return (
    <animated.div ref={ref} style={props} className='player'>
      {imagesToUse.length > 0 && (
        <img src={imagesToUse[imageIndex]} alt="bird" className='bird' />
      )}
    </animated.div>
  );
});

export default Bird;