import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadConference, resetAndPlayTrack } from 'src/actions'
import { getConference, getConferencePagination } from 'src/reducers/selectors'

import Conference from './Conference'

const mapStateToProps = (state) => ({
  items: getConference(state),
  pagination: getConferencePagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadConference,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Conference)
