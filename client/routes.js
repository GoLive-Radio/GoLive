import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup,
        UserHome, Broadcast,
        Landing, MyAccount,
        MyStations, NewBroadcast,
        SingleStation, NewStation
        } from './components';
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
        <Route exact path="/stations/:stationId" component={SingleStation} />
        {
          isLoggedIn &&
          <Switch>
              <Route
                exact path="/broadcasts/:broadcastId"
                render={({ match }) => <Broadcast match={match} />}
              />
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/new-station" component={NewStation} />
              <Route exact path="/stations/:stationId/new-broadcast" component={NewBroadcast} />
              <Route path="/home" component={UserHome} />
              <Route path="/myAccount" component={MyAccount} />
              <Route path="/myStations" component={MyStations} />
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
