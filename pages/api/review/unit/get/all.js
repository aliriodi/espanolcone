import dbConnect from '../../../../../config/mongo'
import UnitReview from '../../../../../models/UnitReview';

export default async function GetAllUnitReview(req, res) {
    const {
        query: { index, maxResults },
        method,
    } = req;

    try {
        console.log('CONNECTING TO MONGO DB');
        await dbConnect();
        console.log('CONNECTED TO MONGO DB');

        const totalCount = await UnitReview.countDocuments();

        const allReviews = maxResults ? 
        await UnitReview.find().skip((maxResults * index)- maxResults).limit(maxResults * index) :
        await UnitReview.find();

        const  output = allReviews

        // Verifica procedencia de solicitud 
        console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

        if(req.headers.accept == "*/*"){
            // Solicitud desde el codigo
            res.status(200).json(
                {
                    reviews: output,
                    totalUReview: totalCount
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
}