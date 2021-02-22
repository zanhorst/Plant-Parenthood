import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { showPost } from '../../api/post'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

class ShowPost extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null, until it is fetched from the api
    this.state = {
      post: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a single movie
    console.log(match)
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

  render () {
    const { post, deleted } = this.state

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

    return (
      <Jumbotron fluid style={{ boxShadow: '3px 3px 3px 3px', marginTop: '20px' }}>
        <Container style={{ textAlign: 'center' }}>
          <h2>{post.title}</h2>
          <h5>{post.body}</h5>
        </Container>
      </Jumbotron>
    )
  }
}

export default withRouter(ShowPost)
