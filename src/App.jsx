import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/core/Layout/Index';
import Login from 'pages/Login';
 
function App() {
  return (
   <>
    <Routes>
      <Route element={<Layout />}>
       <Route path="/" element={<Home />}></Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
   </>
  );
}

export default App;
