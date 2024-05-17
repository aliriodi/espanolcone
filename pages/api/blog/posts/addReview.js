import dbConnect from "../../../../config/mongo";
import Post from "../../../../models/Post";
import { getSession } from "next-auth/react";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addReview(req, res) {
  try {
    const { postId, userId, text, rating } = req.body; // Recupero la info del body

    if (!rating) {
      return res.status(400).json({ message: "Falta el rating de la reseña" }); // Verificación para que ponga el puntaje de la review
    }

    console.log("CONNECTING TO MONGO DB");
    await dbConnect();

    console.log("CONNECTED TO MONGO DB");

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" }); // Verificación para que la review se haga en el post correcto
    }
    console.log("FOUND POST");

    const existingReview = post.reviews.find(
      (review) => review.user.toString() === userId // Compara la ID de la review con la del userId
    );

    console.log('FOUND "existingReview"');

    if (existingReview) {
      existingReview.text = text;
      existingReview.rating = rating;
      existingReview.createdAt = new Date();

      await post.save();

      res.status(200).json({ review: existingReview });
    } else {
      const review = {
        user: userId,
        text: text,
        rating: rating,
        createdAt: new Date(),
      };

      post.reviews.push(review); // Pusheo la review en el array del model post

      await post.save();

      const newReview = post.reviews[post.reviews.length - 1];
      await newReview;

      // Devuelvo la review añadida
      res.status(201).json({ review: newReview });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: error.message });
  }
}
