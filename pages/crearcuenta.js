import React from 'react';
import Layout from '../components/Layout';

const CrearCuenta = () => {
  return ( <Layout>
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>
        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
                <form
                    className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                >
                    <div className='mb-4 '>
                        <label className='block text-black text-sm text-bold mb-2'
                        htmlFor='nombre'
                        >Nombre</label>
                        <input
                            type='text'
                            className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
                            id="nombre"
                            placeholder='Nombre de Usuario'
                        ></input>
                    </div>
                    <div className='mb-4 '>
                        <label className='block text-black text-sm text-bold mb-2'
                        htmlFor='email'
                        >Email</label>
                        <input
                            type='email'
                            className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
                            id="email"
                            placeholder='Email de Usuario'
                        ></input>
                    </div>
                    <div className='mb-4 '>
                        <label className='block text-black text-sm text-bold mb-2'
                        htmlFor='password'
                        >Password</label>
                        <input
                            type='password'
                            className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
                            id="password"
                            placeholder='Password'
                        ></input>
                    </div>
                    <input
                        type='submit'
                        className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                        value='Crear Cuenta'
                    />
                </form>
            </div>
        </div>
    </div>
  </Layout> );
}
 
export default CrearCuenta;