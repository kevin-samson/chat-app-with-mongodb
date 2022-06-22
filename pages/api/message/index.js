import clientPromise from "../../../lib/mongodb";

// Create a new message
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const message = {
      senderId: req.body.senderId,
      conversationId: req.body.conversationId,
      message: req.body.message,
      created_at: new Date(),
    };
    try {
      const client = await clientPromise;
      const db = client.db("test");
      const messageCollection = db.collection("messages");
      const result = await messageCollection.insertOne(message);
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
