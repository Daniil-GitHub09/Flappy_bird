import './App.css'
import Game from './Components/Game'
import { Route, Routes } from 'react-router-dom'
import Store from './Components/Store'
import { BirdProvider } from './Components/BirdContext'
import Home from './Components/Home'

function App() {
  return (
    <>
    <div className='main-container'>
      <BirdProvider>
      <Routes>
        <Route index element={<Game />}></Route> 
        <Route path='store' element={<Store></Store>}></Route> 
        <Route path='home' element={<Home></Home>}></Route> 
      </Routes>
      </BirdProvider>
    </div>
    </>
  )
}

export default App
