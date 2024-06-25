import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes'
import { Views } from './views'

function App() {

  return (
    <BrowserRouter basename='/admin'>
      <Routes>
        <Route path="/connexion" element={<Views.LoginView />} />
        <Route path='*' element={<AppRoutes.MainRoutes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
