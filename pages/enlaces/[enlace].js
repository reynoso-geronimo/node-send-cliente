import Layout from "../../components/Layout";
import clienteAxios from '../../config/axios'

export async function getServerSideProps({params}){
    const {enlace}=  params
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`)

    console.log(resultado);
    return {
        props:{
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths(){
    const enlaces = await  clienteAxios.get('/api/enlaces')
    return {
        paths:enlaces.data.enlaces.map(enlace=>({
            params:{enlace: enlace.url}
        })),
        fallback:false
    }
}
 
// eslint-disable-next-line import/no-anonymous-default-export
export default  ({enlace}) => {
    console.log(enlace);
    return ( 
        <Layout>
            <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
            <div className='flex items-center justify-center mt-10'>
                <a 
                download
                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                className='py-3 px-10 border rounded uppercase font-bold bg-red-500 text-white text-center cursor-pointer'>Aqui</a>
            </div>
        </Layout>
     );
}
