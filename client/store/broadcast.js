import axios from 'axios';
import history from '../history';
import { NEW_BROADCAST, UPDATE_BROADCAST, DELETE_BROADCAST, createNewBroadcast, updateBroadcast, deleteBroadcast } from './sharedBroadcast';

// ACTION TYPES
const GET_BROADCAST = 'GET_BROADCAST';

// ACTION CREATORS
export const getBroadcast = broadcast => ({
  type: GET_BROADCAST,
  broadcast
});

// THUNK CREATORS

// fetch single broadcast
export const fetchBroadcast = id => dispatch =>
  axios
    .get(`/api/broadcasts/${id}`)
    .then(res => res.data)
    .then(broadcast => {
      dispatch(getBroadcast(broadcast));
    })
    .catch(console.error);

export const addBroadcastThunk = broadcast => dispatch =>
  axios
    .post('/api/broadcasts', broadcast)
    .then(res => res.data)
    .then(newBroadcast => {
      dispatch(createNewBroadcast(newBroadcast));
      history.push(`/broadcasts/${newBroadcast.id}`);
    })
    .catch(console.error);

//update broadcast
export const updateBroadcastThunk = (dataToUpdate, broadcast) => dispatch =>
  axios
    .put(`/api/broadcasts/${broadcast.id}`, dataToUpdate)
    .then(res => res.data)
    .then(updatedBroadcast => {
      dispatch(updateBroadcast(updatedBroadcast));
    })
    .catch(console.error);

export const deleteBroadcastThunk = () => dispatch =>
    axios
      .delete();
      //dispatch(deleteBroadcast())

// INITIAL STATE
const initialState = [];

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BROADCAST:
    case NEW_BROADCAST:
    case UPDATE_BROADCAST:
      return action.broadcast;
    case DELETE_BROADCAST:
      return initialState;
    default:
      return state;
  }
}
