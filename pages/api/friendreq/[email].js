import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { email } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const FriendreqCollections = db.collection("friendReq");
    const cursor = FriendreqCollections.find({
      $or: [{ senderEmail: email }, { resEmail: email }],
    });
    const result = await cursor.toArray();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
