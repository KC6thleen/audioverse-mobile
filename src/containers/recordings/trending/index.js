import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTrendingRecordings } from 'src/actions'
import { getTrendingRecordings, getTrendingRecordingsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = state => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadTrendingRecordings,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
