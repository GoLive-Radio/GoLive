/**
 * ACTION TYPES
 */
export const NEW_BROADCAST = 'NEW_BROADCAST';
export const UPDATE_BROADCAST = 'UPDATE_BROADCAST';
export const DELETE_BROADCAST = 'DELETE_BROADCAST';

/**
 * ACTION CREATORS
 */
export const createNewBroadcast = broadcast => ({
  type: NEW_BROADCAST,
  broadcast
});

export const updateBroadcast = broadcast => ({
  type: UPDATE_BROADCAST,
  broadcast
});

export const deleteBroadcast = broadcast => ({
  type: DELETE_BROADCAST,
  broadcast
});
