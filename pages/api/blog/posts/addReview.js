import dbConnect from "../../../../config/mongo";
import Post from "../../../../models/Post";
import { getSession } from "next-auth/react";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addReview(req, res) {
  try {
    /*const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    } */

    const { postId, userId, text, rating, userName } = req.body; // recupero la info del body

    if (!text || !rating) {
      return res
        .status(400)
        .json({ message: "falta el texto o el rating de la reseña" }); // verificacion para que ponga el texto o el puntaje de la review
    }

    await dbConnect();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" }); // verificacion para que la review se haga en el post correcto
    }

    //
    const existingReview = post.reviews.find(
      (review) => review.user.toString() === userId // compara la id de la review con la del userId
    );
    if (existingReview) {
      existingReview.text = text;
      existingReview.rating = rating;
      existingReview.createdAt = new Date();

      await post.save();

      res.status(200).json({ review: existingReview });
    } else {
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
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: error.message });
  }
}
