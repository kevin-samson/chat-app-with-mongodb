import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
//import { ObjectId } from "mongodb";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        //console.log(session);
        session.user.id = user.id;
        //session.testing = user.testing;
      }
      return session;
    },
  },
  // events: {
  //   createUser: async (message) => {
  //     const client = await clientPromise;

  //     let usersCollection = client.db("test").collection("users");
  //     const objid = new ObjectId(message.user.id);

  //     console.log("the message", message.user.id);
  //     const result = await usersCollection.updateOne(
  //       { _id: objid },
  //       {
  //         $set: {
  //           testing: "yes",
  //         },
  //       }
  //     );
  //     console.log(result);
  //   },
  // },
});
