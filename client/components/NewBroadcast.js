import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';

export default class NewBroadcast extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: '',
      titleDirty: false,
      descriptionDirty: false,
      tagsDirty: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    const key = evt.target.name;
    const value = evt.target.value;
    const dirtyField = `${evt.target.name}Dirty`;
    this.setState({[key]: value, [dirtyField]: true});
  }

  render(){
    const { title, description,
            tags, titleDirty,
            descriptionDirty,
            tagsDirty } = this.state;
    const { handleChange } = this;
    return (
      <Form className="vertical-form">
        <Form.Field width={8} error={!title && titleDirty} required>
          <label>Title</label>
          <input
            name="title"
            placeholder="Broadcast title"
            value={title}
            onChange={handleChange} />
        </Form.Field>
            <Message
              hidden={!title && titleDirty}
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
    );
  }

}

// export default connect(mapState, mapDispatch)(NewBroadcast);
