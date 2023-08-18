
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import addUsers from "../users/add";
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
        const user = { email: credentials.email, name: "New User" };
        return user;
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {

      // Usuario registrado con Google
      if (account.provider === "google") {
        //#region Intento de Reutilizar codigo ( RETOMAR ) 
        // const newUser = {
        //   body:{
        //     email: profile.email,
        //     first_name: profile.given_name,
        //     last_name: profile.family_name,
        //     image: {
        //       url: profile.picture,
        //       public_id: ""
        //     },
        //     password,
        //     rol,
        //     phone1,
        //     phone2,
        //     postcode,
        //     image2,
        //     aux,
        //     aux2
        //   }
        // }
        // console.log(newUser)
        // const res = {
        //   status: function(code) {
        //     // Implementa lógica para manejar el código de estado
        //     return this; // Permite encadenar métodos
        //   },
        //   json: function(data) {
        //     // Implementa lógica para manejar la respuesta JSON
        //   }
        // };

        // await addUsers(newUser,res)
        //#endregion

        const newUser = {
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          image: {
            url: profile.picture,
            public_id: ""
          }
        }

        try{
          await dbConnect()
          
          const existingUser = await Users.findOne({ email: profile.email });

          if (!existingUser) await Users.create(newUser)
        }
        catch(e){
          console.log(e)
        }
        
        return profile.email_verified
      }

      return true 
    },
  }
});





