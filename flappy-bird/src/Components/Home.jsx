import React from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  return (
    <>
    <div className="home-page">
      <h1 className='app-title'>Flappy Bird</h1>
      <button className='start' onClick={() => navigate('/')}>Start</button>
    </div>
    </>
  )
}

export default Home