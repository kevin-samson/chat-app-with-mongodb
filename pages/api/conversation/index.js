import clientPromise from "../../../lib/mongodb";

// Create a new conversation
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const conversation = {
      members: [req.body.senderId, req.body.receiverId],
      created_at: new Date(),
    };
    try {
      const client = await clientPromise;
      const db = client.db("test");
      const conversationsCollection = db.collection("conversations");
      const result = await conversationsCollection.insertOne(conversation);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: "John Doe" });
  }
}
