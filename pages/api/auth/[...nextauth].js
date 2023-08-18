
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import addUsers from "../users/add";
import Users from "../../../models/Users";
import dbConnect from "../../../config/mongo";
import axios from "axios";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "yourEmail@gmail.com"},
        password: { label: "Password", type: "password", placeholder: "***********"}
      },
      async authorize(credentials, req) {
        const newUser = { email: credentials.email, password: credentials.password };
        signInUser(newUser);
        return newUser;
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
        //#region Intento de Reutilizar codigo ( RETOMAR ) 
        // const newUser = {
        //   body:{
        //     email: profile.email,
        //     first_name: profile.given_name,
        //     last_name: profile.family_name,
        //     image: {
        //       url: profile.picture,
        //       public_id: ""
        //     }
        //   }
        // }
        // console.log(newUser)
        
        // try{
        //   await axios.post('api/users/add', newUser);
        // }
        // catch(e){
        //   console.log("message: ",e)
        // }

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

        signInUser(newUser)
        
        return profile.email_verified
      }
      return true 
    },
  }
});


async function signInUser(user){
  try{
    await dbConnect()
    
    const existingUser = await Users.findOne({ email: user.email });

    if (!existingUser) await Users.create(user)
  }
  catch(e){
    console.log(e)
  }
}
