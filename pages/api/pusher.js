import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  try {
    const auth = pusher.trigger("presence-channel");
    res.send(auth);
  } catch (e) {
    console.log(e);
  }
}
