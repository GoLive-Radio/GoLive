import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { addBroadcastThunk } from '../store';

const initialState = {
  title: '',
  description: '',
  tags: '',
  titleDirty: false,
  descriptionDirty: false,
  tagsDirty: false,
};

const mapDispatch = dispatch => {
  return {
    addBroadcast: (title, description, tags) => {
      dispatch(addBroadcastThunk({name: title, description, tags}));
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
    const { title, description, tags } = this.state;
    const newTags = tags.replace(/\s/g, '').split(',');
    this.props.addBroadcast(title, description, newTags);
    this.setState(initialState);
  }

  render(){
    const { title, description,
            tags, titleDirty,
            descriptionDirty,
            tagsDirty } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="fill-page">
        <Form className="vertical-form new-broadcast" onSubmit={handleSubmit}>
          <Form.Field width={8} error={!title && titleDirty} required>
            <label>Title</label>
            <input
              name="title"
              placeholder="Broadcast title"
              value={title}
              onChange={handleChange} />
          </Form.Field>
              <Message
                hidden={!!title || !titleDirty}
                error
                header="Title Required"
                content="How else will the people find you???" />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Tell your fans about your broadcast"
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
          <Button disabled={!title || !description || !tags } color="blue" type="submit">Onward!</Button>
        </Form>
      </div>
    );
  }

}

export default connect(null, mapDispatch)(NewBroadcast);
