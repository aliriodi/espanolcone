
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email"

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
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ]
});





