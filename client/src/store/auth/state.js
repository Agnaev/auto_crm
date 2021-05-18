import LocalStorageService from '@/services/LocalStorageService'

const state = () => ({
  userData: JSON.parse(LocalStorageService.userData ?? 'null')
})

export default state
