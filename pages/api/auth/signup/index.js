import { NextResponse } from "next/server";
import Users from "../../../../models/Users";
import dbConnect from "../../../../config/mongo"
import addUsers from "../../users/add";

export default async function POST(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
      }
    
      try {
        await dbConnect(); // Conecta con la base de datos
    
        const { first_name, last_name, email, password, rol, phone1, phone2, postcode, image, image2, aux, aux2 } = req.body;
    
        // Verifica si el correo electrónico ya existe en la base de datos
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'Email already exists' });
        }
    
        // Crea el nuevo usuario
        const newUser = new Users({
          first_name,
          last_name,
          email,
          password,
          rol,
          phone1,
          phone2,
          postcode,
          image,
          image2,
          aux,
          aux2
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
