import LocalStorageService from '@/services/LocalStorageService'

const state = () => ({
  userData: LocalStorageService.userData
})

export default state
