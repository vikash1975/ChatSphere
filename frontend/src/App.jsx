
import HomePage from './pages/Home'
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes';
import Chat from './components/MainChat';


function App() {
  return (
    <>
  <ToastContainer position='top-right' autoClose={4000}  />
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/chat' element={<ProtectedRoutes><Chat /></ProtectedRoutes>} />
  </Routes>
  </>
  )
}

export default App