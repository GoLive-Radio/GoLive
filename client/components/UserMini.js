import React from 'react';
import { Image } from 'semantic-ui-react';

const UserMini = props => {
  const {user, rate} = props;
  const rating =
    rate === 'broadcaster' ?
      user.broadcastRating
      : user.callerRating;

  return (
    <div className="user-mini">
      <img className="mini-pic" src={user.imageUrl} />
      <div id="mini-data">
        <div>
          <h4>{user.fullName}</h4>
        </div>
        <div id="rating">
          <div>
            <img src="/images/fakeData/star.png" />
          </div>
          <p>: {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMini;
