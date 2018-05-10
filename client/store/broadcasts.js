import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_BROADCASTS = 'GET_BROADCASTS';

/**
 * ACTION CREATORS
 */
const getBroadcasts = broadcasts => ({
  type: GET_BROADCASTS,
  broadcasts
});

/**
 * THUNK CREATORS
 */

//get all broadcasts
export const fetchBroadcasts = () =>
  dispatch =>
    axios.get('/api/broadcasts')
    .then(res => res.data)
    .then(broadcasts => {
      dispatch(getBroadcasts(broadcasts));
    })
    .catch(err => console.log(err));

//get all broadcasts by stationId
export const fetchBroadcastsByStationId = (id) =>
    dispatch =>
      axios.get(`/api/broadcasts?stationId=${id}`)
      .then(broadcasts => {
        dispatch(getBroadcasts(broadcasts));
      })
      .catch(err => console.log(err));

/**
 * INITIAL STATE
 */
const broadcasts = [];

/**
 * REDUCER
 */
export default function(state = broadcasts, action) {
  switch (action.type) {
    case GET_BROADCASTS:
      return action.broadcasts;
    default: return state;
  }
}
