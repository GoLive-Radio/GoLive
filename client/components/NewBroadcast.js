import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { addBroadcastThunk } from '../store';

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
    station: state.station
  };
};

const mapDispatch = (dispatch) => {
  return {
    addBroadcast: (broadcastData) => {
      dispatch(addBroadcastThunk(broadcastData));
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
    const stationId = this.props.station.id;
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
    return (
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
    );
  }

}

export default connect(mapState, mapDispatch)(NewBroadcast);
