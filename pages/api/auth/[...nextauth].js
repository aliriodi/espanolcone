
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
        email: { label: "Email", type: "email", placeholder: "yourEmail@gmail.com"},
        password: { label: "Password", type: "password", placeholder: "***********"}
      },
      async authorize(credentials, req) {
        try{
          const userFound = await getUser(credentials.email);
          if(!userFound) throw new Error("incorrect email");

          const passwordMatch = userFound.password == credentials.password;
          if(!passwordMatch) throw new Error("incorrect password");
  
          return userFound;
        }
        catch(error){
          throw error;
        }
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
    async session({ session, user, token }) {
      //  Define lo que va a devolver session.user
        if (session.user) session.user = await getUser(session.user.email)
        return session
    }
  },
  pages: {
    signIn: '/'
  },
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

async function getUser(email){
  try{
    await dbConnect()
    
    const user = await Users.findOne({ email: email });

    return user
  }
  catch(e){
    console.log(e)
  }
}