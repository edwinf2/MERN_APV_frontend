import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

  const { setEdicion, eliminarPaciente } = usePacientes();

  const { _id, nombre, propietario, email, fecha, sintomas } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
  };

  return (
    <>
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">
          Nombre:   {''}
          <span className="font-normal normal-case text-black px-2">
            {nombre}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Propietario:   {''}
          <span className="font-normal normal-case text-black px-2">
            {propietario}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Email Contacto:   {''}
          <span className="font-normal normal-case text-black px-2">
            {email}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Fecha de Alta:   {''}
          <span className="font-normal normal-case text-black px-2">
            {formatearFecha(fecha)}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
          Sintomas:   {''}
          <span className="font-normal normal-case text-black px-2">
            {sintomas}
          </span>
        </p>

        <div className="flex justify-between my-5">
          <button
            className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => setEdicion(paciente)}
          >
            Editar
          </button>
          <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => eliminarPaciente(_id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    
    
    </>
  );
};

export default Paciente;