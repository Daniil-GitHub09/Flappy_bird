import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Store() {

  const [isBought, setIsBought] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <div className='store-page'>
        <button className='back' onClick={() => navigate('/')}>BACK</button>
        <div className='skins'>
          <div className='first-product'>
            <img src="./redbird1.png" alt="" className='bird-image'/>
            <h2 className='name'>special bird</h2>
            {isBought ? <button className='bought'>bought</button> : <button onClick={() => {setIsBought(true)}} className='buy'>buy</button>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Store