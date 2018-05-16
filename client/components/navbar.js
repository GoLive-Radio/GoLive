import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import { Menu, Segment, Dropdown } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn}) => {
  return (
    <div>
    <Segment inverted>
      {/* The navbar will show these links after you log in */}
      <Menu inverted>
        <Menu.Item as={Link} to="/" name="Home" />
        <Menu.Item as={Link} to="/all-stations" name="All Stations" />
        <Menu.Item as={Link} to="/all-broadcasts" name="All Broadcasts" />
        {/* The navbar will show these links after you log in */}
        {
        isLoggedIn &&
          <div className="flex">
            <Menu.Item as={Link} to="/myStations" name="My Stations" />
            <Menu.Item as={Link} to="/new-station" name="Create a New Station" />
            <Menu.Item name="Logout" onClick={handleClick} />
            <Dropdown text="Settings" className="link item">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/myAccount">My Account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
        {/* The navbar will show these links before you log in */}
        {
        !isLoggedIn &&
          <div className="flex">
            <Menu.Item as={Link} to="/login" name="login" />
            <Menu.Item as={Link} to="/signup" name="Sign up" />
          </div>
        }
          {/* The navbar will show these links before you log in */}
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/broadcasts/1" name="Random Live Cast" />
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    broadcasts: state.broadcasts
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
