import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
// Get details of a user
export default async function handler(req, res) {
  const { userId } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const usersCollection = db.collection("users");
    const result = await usersCollection.findOne({
      _id: ObjectId(userId),
    });
    console.log("User result", result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
