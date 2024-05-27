
import dbConnect from '../../../../config/mongo'
import Users from '../../../../models/Users'


export default async function GetByEmail(req, res) {
  const {
    query: { searchTerm, page, maxResults, selects, role },
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

        // define el select final
        let finalSelects = ""
        if(selects) selects.split(',').map( select => finalSelects = finalSelects + `${select} `)

        const query = {
          $and: [

            // Termino de busqueda
            searchTerm != "null" ? {
              $or: [
                { first_name: { $regex: new RegExp(searchTerm, 'i') } },
                { last_name: { $regex: new RegExp(searchTerm, 'i') } },
                { email: { $regex: new RegExp(searchTerm, 'i') } },
              ],
            } : {},

            // Role
            role ?
            { 
              role: role
            } : {}
          ]
        };

        const totalResults = await Users.countDocuments(query);

        const results = await Users.find(query)

        // las variable que no se van a traer
        .select(`${finalSelects.length > 0 ? finalSelects : "-createdAt -updatedAt -password"}`)

        // configuracion de paginado
        .skip((page - 1) * maxResults)
        .limit(maxResults);

        console.log(
          "/////////////////////////////// ",
          req.headers.accept === "*/*" ? "Solicitud desde Codigo" : "Solicitud desde Navegador",
          " ///////////////////////////////"
        );

        if (req.headers.accept === "*/*") {

          // Solicitud desde el código
          return res.status(200).json({ results, totalResults });

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
