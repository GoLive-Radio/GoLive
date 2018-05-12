import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup,
        UserHome, Broadcast,
        Landing, Broadcaster, Player,
        Listener, MyAccount, MyStations,
        NewBroadcast, SingleStation,
        NewStation} from './components';
import {me, fetchBroadcasts} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/broadcasts/broadcaster" component={Broadcaster} />
        <Route path="/broadcasts/new-broadcast" component={NewBroadcast} />
        <Route exact path="/broadcasts/:broadcastId/playback" render={({ match }) => <Player match={match} />} />
        <Route
          exact path="/broadcasts/:broadcastId"
          render={({ match }) => <Broadcast match={match} />}
        />
          <Route path="/stations/:stationId" component={SingleStation} />

        {
          isLoggedIn &&
          <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/myAccount" component={MyAccount} />
              <Route path="/myStations" component={MyStations} />
              <Route path="/station/new-station" component={NewStation} />


            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchBroadcasts());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
