import clientPromise from "../../../lib/mongodb";
// Get a list of all conversations of a user
export default async function handler(req, res) {
  const { conversationId } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const conversationsCollection = db.collection("conversations");
    const cursor = await conversationsCollection.find({
      members: { $in: [conversationId] },
    });
    const result = await cursor.toArray();
    console.log(result);
    console.log(conversationId);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
