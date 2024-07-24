import PusherServer from "pusher";
import Pusher from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1826804",
  key: "279120778ffe98c28612",
  secret: "c76aa2f37438cca0a454",
  cluster: "eu",
  useTLS: true,
});

/**
 * The following pusher client uses auth, not neccessary for the video chatroom example
 * Only the cluster would be important for that
 * These values can be found after creating a pusher app under
 * @see https://dashboard.pusher.com/apps/<YOUR_APP_ID>/keys
 */

export const pusherClient = new Pusher("279120778ffe98c28612", {
  cluster: "eu",
});
