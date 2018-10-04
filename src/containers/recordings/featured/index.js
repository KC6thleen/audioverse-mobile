import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadFeaturedRecordings, resetAndPlayTrack } from 'src/actions'
import { getFeaturedRecordings, getFeaturedRecordingsPagination } from 'src/reducers/selectors'

import FeaturedRecordings from './FeaturedRecordings'

const mapStateToProps = state => ({
  items: getFeaturedRecordings(state),
  pagination: getFeaturedRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadFeaturedRecordings,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedRecordings)
