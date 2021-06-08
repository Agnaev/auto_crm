import AxiosClient from './AxiosClient'
const host = process.env.VUE_APP_API_HOST

class UsersService extends AxiosClient {
  getUsersList () {
    return this.instance.get('/users')
  }

  removeUser (_id) {
    return this.instance.delete('/users?_id=' + _id)
  }

  updateUserInfo ({ username, role, _id, email, salary, phone, address }) {
    return this.instance.put('/users', {
      _id,
      username,
      role,
      email,
      salary,
      address,
      phone
    })
  }

  getMechanicsList () {
    return this.instance.get('/users/mechanics')
  }
}

export default new UsersService(host)
