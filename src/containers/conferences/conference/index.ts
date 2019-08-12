import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadConference } from '../../../actions'
import { getConference, getConferencePagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getConference(state),
  pagination: getConferencePagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadConference,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
