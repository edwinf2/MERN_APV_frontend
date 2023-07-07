import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta.jsx";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {


  const {guardarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});

  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Every verifica si al menus uno esta vacio
    // console.log( Object.values(password).every(campo => campo === ''));
    //Some verifica si todos estan vacios o con algo
    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({        
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if( password.pwd_nuevo.length < 6 ){
      setAlerta({        
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;      
    }
    
    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);

  };

  const {msg} = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aqui</span> </p>
   
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit} >
     

            <div className="my-3">
              <label htmlFor="passwordActual" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Password Actual</label>
              <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passwordActual" name="pwd_actual" placeholder="Escribe tu password actual"
              onChange={ e => setPassword({
                ...password,
                [e.target.name] : e.target.value
              }) }
              />
            </div>
            <div className="my-3">
              <label htmlFor="passwordNuevo" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Password Nuevo</label>
              <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passwordNuevo" name="pwd_nuevo" placeholder="Escribe tu nuevo password"
              onChange={ e => setPassword({
               ...password,
                [e.target.name] : e.target.value
              }) }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 uppercase p-3 w-full lg:w-80 "
            />



          </form>

        </div>

      </div>

    </>
  );
};

export default CambiarPassword;