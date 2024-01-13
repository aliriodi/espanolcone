import dbConnect from '../../../../config/mongo'
import Users from '../../../../models/Users'

export default async function GetUsersPage(req, res) {
    const {
        query: { index, maxResults },
        method,
    } = req;

    try {
        console.log('CONNECTING TO MONGO DB');
        await dbConnect();
        console.log('CONNECTED TO MONGO DB');

        // const maxResults = 18;

        const allUsers = await Users.find().skip((maxResults * index)- maxResults).limit(maxResults * index);

        const  output = allUsers

        // Verifica procedencia de solicitud 
        console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

        if(req.headers.accept == "*/*"){
            // Solicitud desde el codigo
            res.status(200).json(
                {
                    users: output,
                    totalUsers: allUsers.length
                }
            );
        }
        else{
            // Solicitud desde el navegador
            res.status(200).json({ message: "Acceso Denegado" });
        }
    }

    catch (error) {
        console.error("Error :) ",error);
        res.json({ elError:error });
    }
    // res.status(200).json(
    //     {
    //         message:"Hola Mundo"
    //         // users: output,
    //         // totalUsers: allUsers.length
    //     }
    // );
    // switch (method) {
    //     case 'GET':

        
    //     default:
    //         return res.status(405).json({ message: `Method ${method} not allowed` });

    // }
}
