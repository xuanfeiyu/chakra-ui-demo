import request from '../http/request'

export const signIn = (user) => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data: user
  })
}

export const signUp = (user) => {
  return request({
    method: 'post',
    url: '/api/users',
    data: user
  })
}