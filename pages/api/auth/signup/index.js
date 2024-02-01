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
          aux2,
          classes: [
            {
              level: "Nivel A1",
              units: [
                {
                  number: 1,
                  name: "Unidad 1",
                  unitID: "6557e26410faf6be3ada6ad6",
                  description: "Clase Angel Jossue",
                  done: false,
                  enable: true,
                },
                {
                  number: 2,
                  name: "Unidad 2",
                  unitID: "656f7ce03cba936e808e65cf",
                  description: "Creacion de la unidad,con detalles en className",
                  done: false,
                  enable: false,
                  toPay: true
                }
              ]
            },
            {
              level: "Nivel A2",
              units: [
                {
                  number: 1,
                  name: "Unidad 1",
                  unitID: "658fdacd806a84a17add9ef2",
                  description: "Borrada por error",
                  done: false,
                  enable: true,
                },
                {
                  number: 2,
                  name: "Unidad 2",
                  unitID: "65777a904ce41d75980639c2",
                  description: "estas es la unidad dosss cargada por manuel",
                  done: false,
                  enable: false,
                  toPay: true
                }
              ]
            },
            {
              level: "Nivel B1",
              units: [
                {
                  number: 1,
                  name: "Unidad 1",
                  unitID: "6594e96a5dc873ac0cddc2ec",
                  description: "Quiero conocer gente en Cordoba, 3/01/24",
                  done: false,
                  enable: true
                },
                {
                  number: 2,
                  name: "Unidad 2",
                  unitID: "6546bf1977937d4bff645ee0",
                  description: "clase cargada por Virginia a ver que pasa",
                  done: false,
                  enable: false,
                  toPay: true
                },
                {
                  number: 3,
                  name: "Unidad 3",
                  unitID: "655d365dca8556b87fb3f666",
                  description: "Virginia creacion de la unidad 3 nivel b1",
                  done: false,
                  enable: false,
                  toPay: true
                },
                {
                  number: 4,
                  name: "Unidad 4",
                  unitID: "656a6bb1575f46ea611f1cbd",
                  description: "esta es la unidad 4 creada por manuel",
                  done: false,
                  enable: false,
                  toPay: true
                },
                {
                  number: 5,
                  name: "Unidad 5",
                  unitID: "654d4aea964a981dde13750c",
                  description: "clase cargada unidad 5 manu",
                  done: false,
                  enable: false,
                  toPay: true
                }
              ]
            }
          ],
          planSync:{classview:0,qty:0,valid:true}
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
