import { useState, useEffect } from 'react';
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes.jsx';

const FormularioPacientes = () => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    
    guardarPaciente({
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id
    });
    setAlerta({
      msg: 'Paciente guardado',
    });
    setTimeout(() => {
      setAlerta({});
    }, 3000);
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');


  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y  {''}
        <span className="font-bold text-indigo-600"> Administralos</span>
      </p>
      <form action="" method="post" className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="nombreMascota" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            type="text"
            name="nombreMascota"
            id="nombreMascota"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input
            type="text"
            name="propietario"
            id="propietario"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="emailPropietario" className="text-gray-700 uppercase font-bold">Email Propietario</label>
          <input
            type="email"
            name="emailPropietario"
            id="emailPropietario"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <textarea
            name="sintomas"
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
          value={ id ? 'Guardar Cambios' : 'Agregar Paciente' }
        />
      </form>
      {msg && <Alerta alerta={alerta} />}

    </>


  );
};

export default FormularioPacientes