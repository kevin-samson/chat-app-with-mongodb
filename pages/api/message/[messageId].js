import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { messageId } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const messageCollection = db.collection("messages");
    const cursor = messageCollection.find({
      conversationId: messageId,
    });
    const result = await cursor.toArray();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
