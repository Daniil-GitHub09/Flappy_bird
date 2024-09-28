import React, { useEffect, useState, forwardRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const images = [
  './bird1.png',
  './bird2.png',
  './bird3.png',
];

const red_images = [
  './redbird1.png',
  './redbird2.png',
  './redbird3.png',
]

const Bird = forwardRef(({ isFalling, currentY, isBought }, ref) => {
  const [imageIndex, setImageIndex] = useState(0);

  const props = useSpring({
    to: {
      transform: `translateY(${currentY}px) rotate(${isFalling ? '40deg' : '-60deg'})`,
    },
    config: { tension: 350, friction: 50 },
  });

  useEffect(() => {
    if (!isFalling) {
      setImageIndex(1);
      setTimeout(() => {
        setImageIndex(2);
      }, 90);
    } else {
      setImageIndex(0);
    }
  }, [isFalling]);

  return (
    <>
      <animated.div ref={ref} style={props} className='player'>
        {isBought ? <img src={red_images[imageIndex]} alt="bird" className='bird' /> : <img src={images[imageIndex]} alt="bird" className='bird' />}
      </animated.div>  
    </>

  );
});

export default Bird;