import React from 'react';
import { Image } from 'semantic-ui-react';

const CasterMini = props => {
  const { user, rate } = props;
  const rating =
    rate === 'broadcaster' ? user.broadcastRating : user.callerRating;
  const ratingArray = new Array(rating).fill(0);

  return (
    <div className="caster-mini">
      <img className="caster-pic" src={user.imageUrl} />
      <div id="caster-data">
        <div>
          <h4>{user.fullName}</h4>
        </div>
        <p>{rate === 'broadcaster' ? 'Broadcaster Rating' : 'Caller Rating'}</p>
        <div id="rating">
          <div>
            {user && ratingArray.map((i, idx) => (
              <img key={idx} src="/images/fakeData/star.png" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasterMini;
