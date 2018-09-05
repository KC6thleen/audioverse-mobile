import { connect } from 'react-redux'

import { loadFeaturedRecordings, resetAndPlayTrack } from '../../../actions'
import { getFeaturedRecordings, getFeaturedRecordingsPagination } from '../../../reducers/selectors'

import FeaturedRecordings from './FeaturedRecordings'

const mapStateToProps = state => ({
  items: getFeaturedRecordings(state),
  pagination: getFeaturedRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(loadFeaturedRecordings(false, false)),
  loadMore: () => dispatch(loadFeaturedRecordings(true, false)),
  refresh: () => dispatch(loadFeaturedRecordings(false, true)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedRecordings)
