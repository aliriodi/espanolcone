import React from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer/Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";

const UserForm = () => {
  const { data: session, status } = useSession(); // necesito la sesion para saber el id y nombre del usuario
  console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("Debes estar logueado para enviar una reseña.");
      return;
    }

    const formData = new FormData(e.target);
    const intereses = Array.from(formData.getAll("intereses"));
    const data = {
      userId: session.user._id,

      idiomaMaterno: formData.get("materno"),
      fechaNacimiento: formData.get("fechaNacimiento"),
      paisorigen: formData.get("paisDeOrigen"),
      paisrecidencia: formData.get("paisDeRecidencia"),
      intereses: intereses,
    };

    console.log("Datos enviados:", data);

    const response = await fetch("/api/users/interest/addInterest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Datos actualizados correctamente", result);
    } else {
      console.error("Error al actualizar los datos", result.error);
    }
  };

  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta
          name="landing"
          content="welcome"
        />
      </Head>
      <Layout className="bg-white relative overflow-x-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-primary">
            ¡Te damos la bienvenida a Español con E!
          </h2>
          <p className="text-violet_dark">
            Queremos agradecerte y felicitarte por tu decisión de empezar a
            estudiar español con nosotros.
          </p>
          <p className="text-violet_dark">
            Antes de comenzar, te pedimos que llenes este formulario para
            registrar tus datos en nuestro sistema.
          </p>
          <p className="text-bold">
            ¡Disfruta tu aventura de aprender español!
          </p>
          <p className="text-violet_dark">Nos vemos en clases.</p>

          <div className="w-full text-center">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="materno">
              Idioma Materno
            </label>
            <input
              type="text"
              name="materno"
              id="materno"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Idioma materno"
            />
          </div>
          <div className="w-full text-center">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="fechaNacimiento">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              id="fechaNacimiento"
              className="border border-gray-300 p-2 rounded-md w-full text-center"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div className="w-full text-center">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="paisDeOrigen">
              País de origen
            </label>
            <input
              type="text"
              name="paisDeOrigen"
              id="paisDeOrigen"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Pais de origen"
            />
          </div>
          <div className="w-full text-center">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="paisDeRecidencia">
              País de residencia
            </label>
            <input
              type="text"
              name="paisDeRecidencia"
              id="paisDeRecidencia"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Pais de residencia"
            />
          </div>
          <div className="w-full text-center">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="intereses">
              Intereses
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="arte"
                  className="mr-2"
                />{" "}
                Arte
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="musica"
                  className="mr-2"
                />{" "}
                Música
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="ciencia"
                  className="mr-2"
                />{" "}
                Ciencia
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="tecnologia"
                  className="mr-2"
                />{" "}
                Tecnología
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="salud"
                  className="mr-2"
                />{" "}
                Salud
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="bienestar"
                  className="mr-2"
                />{" "}
                Bienestar
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="deportes"
                  className="mr-2"
                />{" "}
                Deportes
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="cultura"
                  className="mr-2"
                />{" "}
                Cultura
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="literatura"
                  className="mr-2"
                />{" "}
                Literatura
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="viajes"
                  className="mr-2"
                />{" "}
                Viajes
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intereses"
                  value="otros"
                  className="mr-2"
                />{" "}
                Otros
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={"btn-primary rounded-md w-full py-2 font-medium"}>
            Enviar
          </button>
        </form>
      </Layout>
    </>
  );
};

export default UserForm;
