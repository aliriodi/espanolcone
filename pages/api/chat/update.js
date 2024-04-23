
import dbConnect from '../../../config/mongo'
import Chat from '../../../models/Chat'


export default async function UpdateChat(req, res) {
//   const {
//     query: { _id },
//     method,
//   } = req;

    const { chat } = req.body;

    try {

        console.log('CONNECTING TO MONGO DB');

        await dbConnect()

        console.log('CONNECTED TO MONGO DB');

        const findChat = await Chat.findById({_id: chat?._id});

        if (!findChat) {
            return res.status(404).json({ message: 'Chat no existe' });
        }
        
        // findChat.messages = [
        //     ...findChat.messages,

        //     {
        //         userID: req.body.userID,
        //         messages: req.body.message
        //     }
        // ]
        // console.log("///// findChat.messages ////", findChat.messages)

        await Chat.updateOne({_id:chat?._id}, {$set: chat})

        
        // Verifica procedencia de solicitud 
        console.log("/////////////////////////////// ",req.headers.accept == "*/*" || true ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

        if(req.headers.accept == "*/*" || true){
        // Solicitud desde el codigo
        return res.status(200).json({findChat});
        }
        else{
        // Solicitud desde el navegador
        res.status(200).json({ message: "Acceso Denegado" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
