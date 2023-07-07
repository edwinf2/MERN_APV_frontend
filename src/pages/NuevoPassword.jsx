import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios.jsx';

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;
    // console.log(token);

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: 'Coloca tu nuevo Password'
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                });
            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true });
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            // console.log(data);

            setAlerta({
                msg: data.msg
            });

            setPasswordModificado(true);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">
                    Restablece tu Password y no pierdas acceso a {""}
                    <span className="text-black"> tus pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <div className="my-6">
                            <label htmlFor="password" className="block text-gray-600 text-xl font-bold mb-2 uppercase">
                                Nuevo Password:
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
                        <input type="submit" value="Cambiar Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                    </form>
                )}

                {passwordModificado &&
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link
                            className='block text-center my-5 text-gray-100 bg-slate-700 hover:bg-slate-800 p-3 mt-auto'
                            to="/">Inicia Sesión
                        </Link>

                    </nav>
                }
            </div>


        </>
    )
}

export default NuevoPassword;