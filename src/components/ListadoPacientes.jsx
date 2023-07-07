import usePacientes from "../hooks/usePacientes.jsx";
import Paciente from "./Paciente.jsx";

const ListadoPacientes = () => {

  const { pacientes } = usePacientes();

  // console.log(pacientes);

  return (
    <>
      {pacientes.length ?
        (
          <>
            <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus  {''}
              <span className="font-bold text-indigo-600"> pacientes y citas</span>

            </p>
            <p>

              {pacientes.map( paciente => (
                <Paciente 
                  key={paciente._id} 
                  paciente={paciente} 
                />
              ) )}
            </p>
          </>
        )
        :
        (
          <>
            <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className="font-bold text-indigo-600"> y apareceran en este lugar </span>

            </p>
          </>
        )}
    </>
  );
};

export default ListadoPacientes