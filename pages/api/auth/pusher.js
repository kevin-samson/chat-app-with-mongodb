import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const { socket_id, channel_name, data } = req.body;
  console.log("Auth request", req.body);
  const presenceData = {
    user_id: data,
    user_info: { name: "Mr Channels", twitter_id: "@pusher" },
  };
  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (e) {
    console.log(e);
  }
}
