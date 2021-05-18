const getters = {
  getUserData: state => state.userData,
  isUserAuth: state => !!state.userData
}

export default getters
