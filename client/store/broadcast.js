import axios from 'axios';

const GET_BROADCAST = 'GET_BROADCAST';
const REMOVE_BROADCAST = 'REMOVE_BROADCAST';
const TOGGLE_LIVE = 'TOGGLE_LIVE';

export const getBroadcast = broadcast => ({
  type: GET_BROADCAST,
  broadcast
});

export const toggleLive = () => ({
  type: TOGGLE_LIVE
});

const defaultBroadcast = {
  isLive: false
};

export default function (state = defaultBroadcast, action) {
  switch (action.type) {
    case GET_BROADCAST:
      return action.broadcast;

    case REMOVE_BROADCAST:
      return defaultBroadcast;

    case TOGGLE_LIVE:
      return Object.assign({}, state, {isLive: !state.isLive});

    default:
      return state;
  }
}
