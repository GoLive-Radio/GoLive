import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BROADCAST = 'GET_BROADCAST';
const REMOVE_BROADCAST = 'REMOVE_BROADCAST';
const TOGGLE_LIVE = 'TOGGLE_LIVE';

/**
 * ACTION CREATORS
 */
export const getBroadcast = broadcast => ({
  type: GET_BROADCAST,
  broadcast
});

export const toggleLive = () => ({
  type: TOGGLE_LIVE
});

/**
 * THUNK CREATORS
 */
// fetch single broadcast
export const fetchBroadcast = (id) =>
  dispatch =>
    axios.get(`/api/broadcasts/${id}`)
    .then(res => res.data)
    .then(broadcast => {
      dispatch(getBroadcast(broadcast));
    })
    .catch(err => console.log(err));

//post new broadcast
export const addBroadcastThunk = (broadcast) => 
  dispatch =>
  axios.post('/api/broadcasts', broadcast)
  .then(res => res.data)
  .then(newBroadcast => {
    dispatch(getBroadcast(newBroadcast));
    history.push(`/broadcasts/${newBroadcast.id}`);
  })
  .catch(console.error);

//update broadcast
export const updateBroadcastThunk = (dataToUpdate, broadcast) =>
  dispatch =>
    axios.put(`/api/broadcasts/${broadcast.id}`, dataToUpdate)
    .then(res => res.data)
    .then(updatedBroadcast => {
      dispatch(getBroadcast(updatedBroadcast));
      history.push(`/broadcasts/${updatedBroadcast.id}`);
    })
    .catch(console.error);

/**
 * INITIAL STATE
 */
const defaultBroadcast = {
  isLive: false
};

/**
 * REDUCER
 */
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
