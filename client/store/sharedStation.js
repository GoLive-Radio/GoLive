/**
 * ACTION TYPES
 */
export const NEW_STATION = 'NEW_STATION';
export const UPDATE_STATION = 'UPDATE_STATION';

/**
 * ACTION CREATORS
 */
export const createNewStation = station => ({
  type: NEW_STATION,
  station
});

export const updateStation = station => ({
  type: UPDATE_STATION,
  station
});
