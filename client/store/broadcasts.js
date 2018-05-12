import axios from 'axios';
import { NEW_BROADCAST, UPDATE_BROADCAST, DELETE_BROADCAST, createNewBroadcast, updateBroadcast, deleteBroadcast } from './sharedBroadcast';

// ACTION TYPES
const GET_BROADCASTS = 'GET_BROADCASTS';
// const GET_STATION_BROADCASTS = 'GET_STATION_BROADCASTS'

// ACTION CREATORS
const getBroadcasts = broadcasts => ({
  type: GET_BROADCASTS,
  broadcasts
});

// const getStationBroadcasts = stationId => ({
//   type: GET_STATION_BROADCASTS,
//   broadcasts
// })

// THUNK CREATORS

//fetch all broadcasts
export const fetchBroadcasts = () => dispatch =>
  axios
    .get('/api/broadcasts')
    .then(res => res.data)
    .then(broadcasts => {
      dispatch(getBroadcasts(broadcasts));
    })
    .catch(console.error);

// INITIAL STATE
const initialState = [];

// REDUCER
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_BROADCASTS:
      return action.broadcasts;

    case NEW_BROADCAST:
      return [...state, action.broadcast];

    case UPDATE_BROADCAST:
      return state.map(broadcast => {
        if (broadcast.id === action.broadcast.id) {
          return action.broadcast;
        } else {
          return broadcast;
        }
      });

    case DELETE_BROADCAST:
      return state.filter(broadcast => {
        return broadcast.id !== action.broadcast.id;
      });

    default:
      return state;
  }
}
