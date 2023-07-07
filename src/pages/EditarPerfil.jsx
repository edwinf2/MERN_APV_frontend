import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, email } = perfil

        if ([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y nombre son obligatorios',
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return;
        }
        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);

    }

    const {msg} = alerta;

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Informacion Aqui</span> </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit} >
                        <div className="my-3">
                            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Nombre</label>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" name="nombre"
                                value={perfil.nombre || ''}
                                onChange={(e) => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Sitio Web</label>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="web" name="web"
                                value={perfil.web || ''}
                                onChange={(e) => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Telefono</label>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="telefono" name="telefono"
                                value={perfil.telefono || ''}
                                onChange={(e) => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 uppercase">Email</label>
                            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email"
                                value={perfil.email || ''}
                                onChange={(e) => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 uppercase p-3 w-full lg:w-80 "
                        />



                    </form>

                </div>

            </div>
        </>
    );
};

export default EditarPerfil;