import MutationTypes from './mutation-types'
import { indexer } from '@/helpers/indexer'

const Mutations = {
  [MutationTypes.SET_SERVICES_LIST]: (state, services) => {
    state.servicesList = services
    state.indexedServicesList = indexer(services)
  },
  [MutationTypes.INDEXING_SERVICES_LIST] (state) {
    state.indexedServicesList = indexer(state.servicesList)
  }
}

export default Mutations
