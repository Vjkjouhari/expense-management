import {Routes, Route, Navigate} from 'react-router-dom'
import Hompage from './pages/Hompage';
import Registerr from './pages/Registerr';
import Login from './pages/Login';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes> <Hompage/> </ProtectedRoutes>} />
        <Route path='/register' element={<Registerr />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }else{
    return <Navigate to="/login" />;
  }
}

export default App;
