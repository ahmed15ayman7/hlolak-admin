import PusherServer from 'pusher'
import Pusher from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: "1807165",
  key: "d6aaeb80e92136847b8b",
  secret: "e30e7d28dccea4334f7a",
  cluster: 'eu',
  useTLS: true,
})

/**
 * The following pusher client uses auth, not neccessary for the video chatroom example
 * Only the cluster would be important for that
 * These values can be found after creating a pusher app under
 * @see https://dashboard.pusher.com/apps/<YOUR_APP_ID>/keys
 */

export const pusherClient = new Pusher("d6aaeb80e92136847b8b", {
  cluster: 'eu',
})