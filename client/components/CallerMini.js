import React from 'react';
import { Image } from 'semantic-ui-react';

const CallerMini = props => {
  const {user} = props;
  return (
    <div className="caller-mini">
      <h4>{user.fullName}</h4>
      <div id="caller-data">
        <img className="caster-pic" src={user.imageUrl} />
        <div id="rating">
          <div>
            <img src="/images/fakeData/star.png" />
          </div>
          <p>: {user.callerRating}</p>
        </div>
      </div>
    </div>
  );
};

export default CallerMini;
