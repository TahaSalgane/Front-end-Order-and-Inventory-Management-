import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dasboard';
import Layout from './components/core/Layout/Index';
import Login from 'pages/Login';
import ProtectedRoutes from 'hoc/ProtectedRoutes';
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(state=>state.auth);
  return (
   <>
    <Routes>
    <Route element={<ProtectedRoutes/>} >
        <Route element={<Layout />}>
               <Route path="/home" element={<Home />}> </Route>
               <Route path="/dasboard" element={<Dashboard />}> </Route>
       </Route>
     </Route>

      <Route path="/" element={!user ? <Login /> : <Navigate to ="/home" />} />
    </Routes>
   </>
  );
}

export default App;
