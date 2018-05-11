import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { addStationThunk } from '../store';

const initialState = {
  name: '',
  description: '',
  tags: '',
  nameDirty: false,
  descriptionDirty: false,
  tagsDirty: false,
};

const mapDispatch = dispatch => {
  return {
    addStation: (name, description, tags) => {
      dispatch(addStationThunk({name, description, tags}));
    }
  };
};

class NewStation extends Component {
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
    const { name, description, tags } = this.state;
    const newTags = tags.replace(/\s/g, '').split(',');
    this.props.addStation(name, description, newTags);
    this.setState(initialState);
  }

  render(){
    const { name, description,
            tags, nameDirty,
            descriptionDirty,
            tagsDirty } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="fill-page">
        <Form className="vertical-form" onSubmit={handleSubmit}>
          <Form.Field width={8} error={!name && nameDirty} required>
            <label>Name</label>
            <input
              name="name"
              placeholder="Station name"
              value={name}
              onChange={handleChange} />
          </Form.Field>
              <Message
                hidden={!!name || !nameDirty}
                error
                header="Name Required"
                content="How else will the people find you???" />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Tell your fans about your Station"
            value={description}
            width={8}
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

export default connect(null, mapDispatch)(NewStation);
