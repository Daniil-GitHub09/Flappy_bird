import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useBird } from './BirdContext'

function Home() {

  const navigate = useNavigate()

  const { numberBackground } = useBird()

  return (
    <>
    <div className="home-page">
    <img src={numberBackground === 1 ? "./night.png" : './background.png'} alt='background' className='store-page'/>
      <h1 className='app-title'>Flappy Bird</h1>
      <button className='start' onClick={() => navigate('/')}>Start Game</button>
      <button className='start' onClick={() => navigate('/store')}>Store</button>
    </div>
    </>
  )
}

export default Home