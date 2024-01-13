
import dbConnect from '../../../../config/mongo'
import Users from '../../../../models/Users'


export default async function GetByEmail(req, res) {
  const {
    query: { searchTerm, page, maxResults },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        console.log("/////////////////////// ",page," ///////////////////////")
        console.log('CONNECTING TO MONGO DB');
        await dbConnect();
        console.log('CONNECTED TO MONGO DB',);

        console.log('/api/users/[searchTerm] user with searchTerm:', searchTerm);

        const results = await Users.find({
          $or: [
            { first_name: { $regex: new RegExp(searchTerm, 'i') } },
            { last_name: { $regex: new RegExp(searchTerm, 'i') } },
            { email: { $regex: new RegExp(searchTerm, 'i') } },
          ],
        }).select('-createdAt -updatedAt -password').skip((maxResults * page)- maxResults).limit(maxResults * page);

        // if (!results || results.length === 0) {
        //   return res.status(404).json({ message: 'No se encontraron usuarios' });
        // }

        console.log(
          "/////////////////////////////// ",
          req.headers.accept === "*/*" ? "Solicitud desde Codigo" : "Solicitud desde Navegador",
          " ///////////////////////////////"
        );

        if (req.headers.accept === "*/*") {
          // Solicitud desde el código
          return res.status(200).json({ results });
        } else {
          // Solicitud desde el navegador
          res.status(200).json({ message: "Acceso Denegado" });
        }
      } catch (error) {
        console.error('Error al buscar en MongoDB:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};
