import dbConnect from "../../../../config/mongo";
import Post from "../../../../models/Post";
import { getSession } from "next-auth/react";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addReview(req, res) {
  /* const session = await getSession({ req });                     TODO: solucionar esto!
  if (!session) {                                                   por alguna razon cuando pongo esta validacion no funciona mas
    return res.status(401).json({ message: "Not authenticated" }); // verificacion para el back para que solo reseñen los logueados
  } */

  const { postId, userId, text, rating, userName } = req.body; // recupero la info del body

  if (!text & !rating) {
    return res.status(401).json({ message: "faltan texto o puntaje" }); // verificacion para que ponga el texto o el puntaje de la review
  }

  try {
    await dbConnect();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" }); // verificacion para que la review se haga en el post correcto
    }

    const review = {
      user: userId,
      username: userName,
      text: text,
      rating: rating,
      createdAt: new Date(),
    };

    post.reviews.push(review); // pusheo la review en el array del model post
    await post.save();

    // devuelvo la review añadida
    res.status(201).json({ review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: error.message });
  }
}
