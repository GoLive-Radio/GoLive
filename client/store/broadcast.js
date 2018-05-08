import axios from 'axios';

const GET_BROADCAST = 'GET_BROADCAST';
const REMOVE_BROADCAST = 'REMOVE_BROADCAST';

export const getBroadcast = broadcast => ({
  type: GET_BROADCAST,
  broadcast
});

const defaultBroadcast = {};

export default function (state = defaultBroadcast, action) {
  switch (action.type) {
    case GET_BROADCAST:
      return action.broadcast;

    case REMOVE_BROADCAST:
      return defaultBroadcast;

    default:
      return state;
  }
}
