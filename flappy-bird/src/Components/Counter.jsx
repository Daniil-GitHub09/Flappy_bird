import React from 'react'
import './styles.css'

function Counter({point}) {
  return (
    <>
      <div className='point-container'>
        <h1 className='point'>{point}</h1>      
      </div>

    </>
  )
}

export default Counter