import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useAuth from '../hooks/useAuth.jsx';

const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  if (cargando) return 'cargando';
  // console.log(auth);
  // console.log(cargando);

  return (
    <>
      <Header />
        {auth?._id ?( 
          <main className='container mx-auto mt-10'>          
            <Outlet /> 
          </main>
        ): <Navigate to="/" />}
      <Footer />
    </>
  )
}

export default RutaProtegida