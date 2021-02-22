// imports
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { indexAllPosts } from '../../api/post'

// class

class IndexAllPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    indexAllPosts(user)
      .then(res => this.setState({ posts: res.data.posts }))
      .catch(console.error)
  }

  render () {
    let postsJsx
    if (!this.state.posts) {
      postsJsx = <img style={{ width: '30%' }} src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="loading/gif"/>
    } else if (this.state.posts.length === 0) {
      postsJsx = 'No post history.'
    } else {
      postsJsx = this.state.posts.map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`} title={post.title} body={post.body}>
            {post.title} (ID: {post.id})
          </Link>
        </li>
      ))
    }

    return (
      <React.Fragment>
        <h1>Index Posts Page</h1>
        {postsJsx}
      </React.Fragment>
    )
  }
}

// exports
export default withRouter(IndexAllPosts)
