import './App.css'
import Game from './Components/Game'
import { Route, Routes } from 'react-router-dom'
import Store from './Components/Store'

function App() {

  return (
    <>
    <div className='main-container'>
      <Routes>
        <Route index element={<Game />}></Route> 
        <Route path='store' element={<Store></Store>}></Route> 
      </Routes>
    </div>
    </>
  )
}

export default App
