import dbConnect from "../../../../config/mongo";
import Users from "../../../../models/Users";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function addInterest(req, res) {
  try {
    const {
      userId,
      idiomaMaterno,
      fechaNacimiento,
      paisorigen,
      paisrecidencia,
      intereses,
    } = req.body; // saco el email , nombre y intereses de la body

    if (
      !userId ||
      !idiomaMaterno ||
      !paisorigen ||
      !paisrecidencia ||
      !intereses
    ) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    console.log("CONNECTING TO MONGO DB");
    await dbConnect();

    console.log("CONNECTED TO MONGO DB");

    const user = await Users.findById(userId);

    if (!user) {
      console.log("Usuario no encontrado:", userId);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", user);

    user.idiomaMaterno = idiomaMaterno;
    user.fechaNacimiento = new Date(fechaNacimiento);
    user.paisorigen = paisorigen;
    user.paisrecidencia = paisrecidencia;

    if (!Array.isArray(user.interests)) {
      user.interests = [];
    }
    user.interests = [...new Set([...user.interests, ...intereses])];

    console.log("Intereses antes de guardar:", user.interests);

    await user.save();

    console.log("Datos actualizados correctamente:", user);

    res.status(200).json({ message: "Datos actualizados correctamente", user });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
}
