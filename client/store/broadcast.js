import axios from 'axios';

const GET_BROADCAST = 'GET_BROADCAST';
const ADD_BROADCAST = 'ADD_BROADCAST';
const REMOVE_BROADCAST = 'REMOVE_BROADCAST';
const TOGGLE_LIVE = 'TOGGLE_LIVE';

export const getBroadcast = broadcast => ({
  type: GET_BROADCAST,
  broadcast
});

export const addBroadcast = broadcast => ({
  type: ADD_BROADCAST,
  broadcast
});

export const toggleLive = () => ({
  type: TOGGLE_LIVE
});

export const addLiveBroadcast = (broadcast) => (dispatch) => {
  return axios.post('/api/broadcast', broadcast)
    .then(res => res.data)
    .then(newBroadcast => {
      console.log('newBroadcast: ', newBroadcast);
      dispatch(addBroadcast(newBroadcast));
    })
    .catch(err => {
      console.error(err);
    });
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_BROADCAST:
      return action.broadcast;

    case ADD_BROADCAST:
      return [...state, action.broadcast];

    case REMOVE_BROADCAST:
      return state;

    case TOGGLE_LIVE:
      //return Object.assign({}, state, {isLive: !state.isLive});
      break;

    default:
      return state;
  }
}
