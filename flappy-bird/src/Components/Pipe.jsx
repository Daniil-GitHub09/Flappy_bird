import './styles.css';
import React, { forwardRef } from 'react';

const Pipe = forwardRef(({ position_pipe_container }, ref) => {
  const pipe_width = 70; // Ширина трубы
  const pipe_height = 400; // Высота трубы
  const gap_height = 140; // Высота зазора между трубами

  return (
    <div className='pipe-container' ref={el => ref.current[0] = el}>
      {/* Верхняя труба */}
      <div ref={el => ref.current[1] = el} className='pipe-collider first' style={{ width: `${pipe_width}px`, height: `${pipe_height}px`, transform: `translateY(${position_pipe_container}px)` }}>
        <img src="./pipe1.png" alt="pipe1" className='pipe1' />
      </div>

      {/* Зазор между трубами */}
      <div ref={el => ref.current[3] = el} className='score-zone' style={{ width: `1px`, height: `${gap_height}px`, transform: `translateY(${position_pipe_container}px)` }} />

      {/* Нижняя труба */}
      <div ref={el => ref.current[2] = el} className='pipe-collider second' style={{ width: `${pipe_width}px`, height: `${pipe_height}px`, transform: `translateY(${position_pipe_container}px)` }}>
        <img src="./pipe2.png" alt="pipe2" className='pipe2' />
      </div>
    </div>
  );
});

export default Pipe;