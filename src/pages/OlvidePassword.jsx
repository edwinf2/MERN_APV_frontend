import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios';


const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({msg: 'El Email es obligatorio', error: true});
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', {email});
      // console.log(data);
      setAlerta({msg: data.msg});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  };

  const { msg } = alerta;

  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-4xl">
          Recupera tu Acceso y no pierdas {""}
          <span className="text-black"> tus pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}
        <form action="" method="post" onSubmit={handleSubmit} >
          <div className="my-5">
            <label htmlFor="email" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Tu Email de Registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input type="submit" value="Enviar instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
              className='block text-center my-5 text-gray-500 hover:text-gray-800'
              to="/">¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link 
              className='block text-center my-5 text-gray-500 hover:text-gray-800'
              to="/registrar">¿No tienes una cuenta? Registrate    
            </Link>
          </nav>

      </div>

    </>
  )
}

export default OlvidePassword;