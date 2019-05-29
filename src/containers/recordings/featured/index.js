import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadFeaturedRecordings } from 'src/actions'
import { getFeaturedRecordings, getFeaturedRecordingsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = state => ({
  items: getFeaturedRecordings(state),
  pagination: getFeaturedRecordingsPagination(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadFeaturedRecordings,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
