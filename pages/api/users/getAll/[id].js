import dbConnect from '../../../../config/mongo'
import Users from '../../../../models/Users'

export default async function getTeachersWithAgendaFromTomorrow(req, res) {
    const {
        query: { id },
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

                const filteredUser = allUsers.slice((maxResults * id) - maxResults, maxResults * id);

                const  output = filteredUser

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
                console.error(error);
                res.json({ error });
            }
        
        default:
            return res.status(405).json({ message: `Method ${method} not allowed` });

    }
}
