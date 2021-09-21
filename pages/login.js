import React,{useContext, useEffect} from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
import {useRouter} from 'next/router'

const Login = () => {


  const AuthContext = useContext(authContext)
  const {mensaje, iniciarSesion , autenticado}=AuthContext

  const router = useRouter();
  useEffect(() => {
    if(autenticado){
      router.push('/')
    }
  
  }, [autenticado])

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El Email es obligatiorio"),
      password: Yup.string().required("El password no puede estar vacio"),
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores );
    },
  });
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar Sesion
        </h2>
        {mensaje && <Alerta/>}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm text-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border--4  border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  className="block text-black text-sm text-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border--4  border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                className="bg-red-500 w-full uppercase text-white font-bold uppercase p-2 hover:bg-gray-900"
                value="Iniciar Sesion"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
