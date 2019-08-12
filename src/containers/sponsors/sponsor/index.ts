import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadSponsor } from '../../../actions'
import { getSponsor, getSponsorPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getSponsor(state),
  pagination: getSponsorPagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSponsor,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
