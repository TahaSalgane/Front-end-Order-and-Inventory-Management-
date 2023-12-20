import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dasboard';
import Profile from 'pages/Profile';
import Layout from './components/core/Layout/Index';
import Login from 'pages/Login';
import ProtectedRoutes from 'hoc/ProtectedRoutes';
import { useSelector } from 'react-redux';
import Articels from 'pages/Articles';
import Users from 'pages/Users';
import Orders from 'pages/Orders';
import Reclamation from 'pages/Reclamation';
import Classes from 'pages/Classes';
import Parametre from 'pages/parametre';
import ClasseArticles from 'pages/ClasseArticles';
import { ToastContainer } from 'react-toastify';

function App() {
  const {user} = useSelector(state=>state.auth);
  return (
   <>
    <ToastContainer />

    <Routes>
    <Route element={<ProtectedRoutes/>} >
        <Route element={<Layout />}>
               <Route path="/dashboard" element={<Dashboard />}> </Route>
               <Route path="/profile" element={<Profile />}> </Route>
               <Route path="/articles" element={<Articels />}> </Route>
               <Route path="/utilisateurs" element={<Users />}> </Route>
               <Route path="/parametre" element={<Parametre />}> </Route>
               <Route path="/ordres" element={<Orders />}> </Route>
               <Route path="/réclamation" element={<Reclamation />}> </Route>
               <Route path="/classes/:etablissement" element={<Classes />}> </Route>
               <Route path="/classes/:etablissement/:classId" element={<ClasseArticles />}> </Route>
       </Route>
     </Route>

      <Route path="/" element={!user ? <Login /> : <Navigate to ="/dashboard" />} />
    </Routes>
   </>
  );
}

export default App;
