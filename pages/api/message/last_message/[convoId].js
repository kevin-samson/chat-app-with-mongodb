import clientPromise from "../../../../lib/mongodb";
// Get the last message of a conversation

export default async function handler(req, res) {
  const { convoId } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const messageCollection = db.collection("messages");
    const result = await messageCollection.findOne(
      {
        conversationId: convoId,
      },
      {
        sort: { created_at: -1 },
      }
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
