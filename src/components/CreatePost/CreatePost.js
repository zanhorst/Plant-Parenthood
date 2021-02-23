import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPost } from '../../api/post'
import messages from '../AutoDismissAlert/messages'

// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePost = event => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props
    if (user) {
      createPost(user, this.state)
        .then(() => msgAlert({
          heading: 'Post Successful.',
          message: messages.createPostSuccess,
          variant: 'success'
        }))
        .then(() => history.push('/index-my-posts'))
        .catch(error => {
          this.setState({ title: '', body: '' })
          msgAlert({
            heading: 'Post Failed with error: ' + error.message,
            message: messages.createPostFailure,
            variant: 'danger'
          })
        })
    }
  }

  render () {
    const { title, body } = this.state

    return (
      <div className="row">
        <Row>
          <Form onSubmit={this.onCreatePost}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={title}
                placeholder="Enter a title"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                required
                type="text"
                name="body"
                value={body}
                placeholder="Type something!"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Row>
      </div>
    )
  }
}

export default withRouter(CreatePost)
