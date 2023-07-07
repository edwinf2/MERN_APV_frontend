import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios.jsx';

const Registrar = () => {

  //Deiniendo el state de este componente
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({msg: 'Las contraseñas no coinciden', error: true});
      return;
    }

    if( password.length < 6){
      setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
        return;
    }
    setAlerta({});

    //Crear el usuario en la Api
    try {

      await clienteAxios.post(`/veterinarios`, {
        nombre,
        email,
        password
      });
      setAlerta({msg: 'Cuenta creada correctamente, revista tu email', error: false});

    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true});
    }

  };

  const { msg } = alerta;

  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-4xl">
          Crea tu cuenta y administra tus {""}
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}
        <form action="" method="post" onSubmit={handleSubmit} >
          <div className="my-5">
            <label htmlFor="nombre" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="email" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Email de registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Tu Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="repetirpassword" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
              Repite tu Password:
            </label>
            <input
              type="password"
              name="repetirpassword"
              id="repetirpassword"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              placeholder="Repite Tu Password"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>


          <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-500 hover:text-gray-800'
            to="/">¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className='block text-center my-5 text-gray-500 hover:text-gray-800'
            to="/olvide-password">Olvide mi Password
          </Link>
        </nav>

      </div>

    </>
  )
}

export default Registrar;