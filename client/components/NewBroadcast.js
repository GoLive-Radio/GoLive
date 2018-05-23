import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { addBroadcastThunk, fetchStationsByUserId } from '../store';

const initialState = {
  name: '',
  description: '',
  tags: '',
  titleDirty: false,
  descriptionDirty: false,
  tagsDirty: false,
};

const mapState = state => {
  return {
    user: state.user,
    station: state.station,
    stationsByUser: state.stationsByUser
  };
};

const mapDispatch = (dispatch) => {
  return {
    addBroadcast: (broadcastData) => {
      dispatch(addBroadcastThunk(broadcastData));
    },
    loadUserStations: (userId) => {
      dispatch(fetchStationsByUserId(userId));
    }
  };
};

class NewBroadcast extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.loadUserStations(this.props.user.id);
  }

  handleChange(evt){
    const key = evt.target.name;
    const value = evt.target.value;
    const dirtyField = `${evt.target.name}Dirty`;
    this.setState({[key]: value, [dirtyField]: true});
  }

  handleSubmit(evt){
    evt.preventDefault();
    const userId = this.props.user.id;
    const { name, description} = this.state;
    let {tags} = this.state;
    tags = tags.replace(/\s/g, '').split(',');
    const stationId = this.props.match.params.stationId;
    const broadcastData = {
      name,
      description,
      tags,
      stationId,
      userId
    };
    this.props.addBroadcast(broadcastData);
    this.setState(initialState);
  }

  render(){
    const { name, description,
            tags, titleDirty,
            descriptionDirty,
            tagsDirty } = this.state;
    const { handleChange, handleSubmit } = this;

    // create an array of all station ids belonging to current user
    const userStationIds = [];
    if (this.props.stationsByUser) {
      this.props.stationsByUser.forEach(station => {
      userStationIds.push(station.id);
      });
    }

    // check to see if current user owns the station that they 
    // are trying to create a broadcast for.
    const isStationOwner = userStationIds.includes(+this.props.match.params.stationId);

    return (
      !isStationOwner ? (
      <div className="forbidden">
        <h1>You do not own this station.</h1>
      </div>
       ) : (
      <div className="fill-page">
        <Form className="vertical-form new-broadcast" onSubmit={handleSubmit}>
          <Form.Field width={8} error={!name && titleDirty} required>
            <label>Title</label>
            <input
              name="name"
              placeholder="Broadcast title"
              value={name}
              onChange={handleChange} />
          </Form.Field>
              <Message
                hidden={!!name || !titleDirty}
                error
                header="Title Required"
                content="How else will the people find you???" />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Tell your fans about your broadcast"
            value={description}
            width={8}
            maxLength={116}
            onChange={handleChange}
            error={!description && descriptionDirty}
            required />
          <Form.Field
            width={8}
            error={!tags && tagsDirty}
            required
            >
            <label>Tags</label>
            <input
              name="tags"
              placeholder="Enter comma separated tags"
              value={tags}
              onChange={handleChange} />
          </Form.Field>
          <Button disabled={!name || !description || !tags } color="blue" type="submit">Onward!</Button>
        </Form>
      </div>
       )
    );
  }

}

export default connect(mapState, mapDispatch)(NewBroadcast);
