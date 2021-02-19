import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (post, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/create-post',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      post: {
        title: post.title,
        password: post.body
      }
    }
  })
}

export const indexAllPosts = user => {
  return axios({
    url: apiUrl + '/index-posts',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const indexMyPosts = user => {
  return axios({
    url: apiUrl + '/index-posts',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const deletePost = user => {
  return axios({
    url: apiUrl + '/delete-post',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editPost = (user, post) => {
  return axios({
    url: apiUrl + '/update-post',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      post: {
        title: self.title,
        body: self.body
      }
    }
  })
}
