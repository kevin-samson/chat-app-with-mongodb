import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const body = {
      senderId: req.body.senderId,
      senderEmail: req.body.senderEmail,
      resEmail: req.body.resEmail,
      created_at: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db("test");
      const FriendreqCollections = db.collection("friendReq");
      const result = await FriendreqCollections.insertOne(body);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else if (req.method === "DELETE") {
    // Process a DELETE request
    const id = req.body.id;
    try {
      const client = await clientPromise;
      const db = client.db("test");
      const FriendreqCollections = db.collection("friendReq");
      const result = await FriendreqCollections.deleteOne({
        _id: ObjectId(id),
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: "No get method" });
  }
}
