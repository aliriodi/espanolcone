import dbConnect from '../../../../config/mongo'
import Users from '../../../../models/Users'

export default async function GetAllUsers(req, res) {
    const {
        query: { index },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                console.log('CONNECTING TO MONGO DB');
                await dbConnect();
                console.log('CONNECTED TO MONGO DB');

                const maxResults = 18;

                const allUsers = await Users.find().exec();

                const filteredUser = allUsers.slice((maxResults * index) - maxResults, maxResults * index);

                const  output = filteredUser

                // Verifica procedencia de solicitud 
                console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

                // if(req.headers.accept == "*/*"){
                //     // Solicitud desde el codigo
                //     res.status(200).json(
                //         {
                //             users: output,
                //             // totalUsers: allUsers.length
                //         }
                //     );
                // }
                // else{
                //     // Solicitud desde el navegador
                //     res.status(200).json({ message: "Acceso Denegado" });
                // }

                res.status(200).json(
                    {
                        // message:"Hola Mundo"
                        users: output,
                        totalUsers: allUsers.length
                    }
                );

            }

            catch (error) {
                console.error("Error :) ",error);
                res.json({ elError:error });
            }
        
        default:
            return res.status(405).json({ message: `Method ${method} not allowed` });

    }
}
