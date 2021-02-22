import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (user, post) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      post: {
        title: post.title,
        body: post.body
      }
    }
  })
}

export const indexAllPosts = user => {
  return axios({
    url: apiUrl + '/posts/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {}
  })
}

export const indexMyPosts = user => {
  return axios({
    url: apiUrl + '/posts-filter/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {}
  })
}

export const showPost = (user, id) => {
  return axios({
    url: apiUrl + '/posts/' + `${id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {}
  })
}

export const deletePost = user => {
  return axios({
    url: apiUrl + '/posts/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updatePost = (user, post) => {
  return axios({
    url: apiUrl + '/update-post/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      post: {
        title: self.title,
        body: self.body
      }
    }
  })
}
