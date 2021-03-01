import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { showPost, deletePost, updatePost } from '../../api/post'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import UpdateForm from '../UpdateForm/UpdateForm'
// import axios from 'axios'
class ShowPost extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null, until it is fetched from the api
    this.state = {
      post: null,
      deleted: false,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log('page mounted')
    // make a request for a single movie
    showPost(user, match.params.id)
      .then(res => this.setState({ post: res.data.post }))
      .then(() => msgAlert({
        heading: 'Showing Post Successfully',
        message: 'Your post is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to show your post',
          message: 'Failed to show post with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    event.persist()
    this.setState((state) => {
      return {
        post: { ...state.post, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { post } = this.state

    updatePost(match.params.id, user, post)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated Post Successfully',
          variant: 'success',
          message: 'Post has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Post Failed',
          variant: 'danger',
          message: 'Post was not updated due to error: ' + err.message
        })
      })
  }

  handleDelete = event => {
    const { user, msgAlert, match } = this.props

    // make a delete axios request
    deletePost(user, match.params.id)
      // set the deleted variable to true, to redirect to the movies page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Post Successfully!',
        message: 'Post deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Post Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { post, deleted, updated } = this.state
    // if we don't have a post yet
    if (!post) {
    // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the post is deleted
    if (deleted) {
      return <Redirect to="/index-my-posts" />
    }

    if (updated) {
      return <Redirect to="/index-my-posts" />
    }

    return (
      <Jumbotron fluid style={{ boxShadow: '3px 3px 3px 3px', marginTop: '20px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2>{post.title}</h2>
          <h5>{post.body}</h5>
          <Button onClick={this.handleDelete}>Delete</Button>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={post.title}
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
                value={post.body}
                placeholder="Type something!"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Edit Post
            </Button>
          </Form>
        </Container>
      </Jumbotron>
    )
  }
}

export default withRouter(ShowPost)
