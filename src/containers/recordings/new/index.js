import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadNewRecordings, resetAndPlayTrack } from 'src/actions'
import { getNewRecordings, getNewRecordingsPagination } from 'src/reducers/selectors'

import NewRecordings from './NewRecordings'

const mapStateToProps = state => ({
  items: getNewRecordings(state),
  pagination: getNewRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadNewRecordings,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordings)
