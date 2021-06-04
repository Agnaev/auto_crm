import MutationTypes from './mutation-types'
import { indexer } from '@/helpers/indexer'

const Mutations = {
  [MutationTypes.SET_SERVICES_LIST]: (state, services) => {
    state.servicesList = services
    state.indexedServicesList = indexer(services)
  },
  [MutationTypes.INDEXING_SERVICES_LIST] (state) {
    state.indexedServicesList = indexer(state.servicesList)
  },
  [MutationTypes.SET_MY_SERVICE_RECORDS_LIST] (state, list) {
    state.myServicesRecords = list
  },
  [MutationTypes.SET_MECHANIC_SCHEDULE] (state, schedule) {
    state.mechanicSchedule = schedule
  }
}

export default Mutations
