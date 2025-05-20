import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Inicio from './pages/inicio';
import QuienesSomos from './pages/quienesSomos';
import Contacto from './pages/contactanos';
import Error404 from './pages/404';

function App() {

    // useEffect(() => {
    //             fetch('http://localhost:8001/usuarios',{
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //             })
    //             .then((response) => response.json())
    //             .then((response) => {
    //             setListaUsuarios(response);
    //             })
        
    //             .catch((error) => 
    //             console.error('Error al traer datos:', error)
    //             )
    //   }, []);

  return (
    
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/about" element={<QuienesSomos />} />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  
  )
}

export default App;