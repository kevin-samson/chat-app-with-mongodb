import { pusher } from "../../lib/pusher";

export default async function handler(req, res) {
  const message = {
    senderId: req.body.senderId,
    conversationId: req.body.conversationId,
    message: req.body.message,
    created_at: new Date(),
  };
  try {
    await pusher.trigger(
      "presence-" + req.body.conversationId,
      "message-rev",
      message
    );
    res.send("snd");
  } catch (e) {
    console.log(e);
  }
}
