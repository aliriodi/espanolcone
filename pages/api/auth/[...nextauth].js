
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Users from "../../../models/Users";
import dbConnect from "../../../config/mongo";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "yourEmail@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "***********" }
      },
      async authorize(credentials, req) {

        try {
          const userFound = await getUser(credentials.email);
          if (!userFound) throw new Error("incorrect email");

          const passwordMatch = userFound.password == credentials.password;
          if (!passwordMatch) throw new Error("incorrect password");

          return { email: credentials.email, password: credentials.password };
        }
        catch (error) {
          throw error;
        }

      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:'https://espanolcone.com'
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Usuario registrado con Google
      if (account.provider === "google") {
        const newUser = {
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          image: {
            url: profile.picture,
            public_id: "",
          },
          classes: [
            {
              level: "Nivel A1",
              units: [
                {
                  number: 1,
                  name: "Unidad 1",
                  unitID: "6557e26410faf6be3ada6ad6",
                  description: "Clase Angel Jossue",
                  done: true,
                  enable: true,
                },
                {
                  number: 2,
                  name: "Unidad 2",
                  unitID: "656f7ce03cba936e808e65cf",
                  description: "Creacion de la unidad,con detalles en className",
                  done: false,
                  enable: true,
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
          planSync: {
            clasview: 0,
            qty: 0,
            valid: true
          }
        }

        signInUser(newUser)

        return profile.email_verified
      }
      // console.log(account)
      return true
    },
    async session({ session, token }) {
      //  Define lo que va a devolver session.user
      if (session.user) {
        let user = await getUser(session.user.email)

        // Se configuran Session
        session.user = user;

        // Se configura Token
        // token.role = user?.role;
      }

      return session
    }
  },
  pages: {
    signIn: '/'
  },
});


async function signInUser(user) {
  try {
    await dbConnect()

    const existingUser = await Users.findOne({ email: user.email });

    if (!existingUser) await Users.create(user)
  }
  catch (e) {
    console.log(e)
  }
}

async function getUser(email) {
  try {
    await dbConnect()

    const user = await Users.findOne({ email: email });

    return user
  }
  catch (e) {
    console.log(e)
  }
}