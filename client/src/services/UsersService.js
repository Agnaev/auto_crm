import AxiosClient from './AxiosClient'
const host = process.env.VUE_APP_API_HOST

class UsersService extends AxiosClient {
  getUsersList () {
    return this.instance.get('/users')
  }

  removeUser (_id) {
    return this.instance.delete('/users?_id=' + _id)
  }

  updateUserInfo ({ username, role, _id, email }) {
    return this.instance.put('/users', {
      _id,
      username,
      role,
      email
    })
  }
}

export default new UsersService(host)
