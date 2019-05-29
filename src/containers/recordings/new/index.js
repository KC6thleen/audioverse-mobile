import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadNewRecordings } from 'src/actions'
import { getNewRecordings, getNewRecordingsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = state => ({
  items: getNewRecordings(state),
  pagination: getNewRecordingsPagination(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadNewRecordings,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
