import { connect } from 'react-redux'

import { loadSponsor, resetAndPlayTrack } from 'src/actions'
import { getSponsor, getSponsorPagination } from 'src/reducers/selectors'

import Sponsor from './Sponsor'

const mapStateToProps = (state) => ({
  items: getSponsor(state),
  pagination: getSponsorPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadSponsor(false, false, url)),
  loadMore: (url) => dispatch(loadSponsor(true, false, url)),
  refresh: (url) => dispatch(loadSponsor(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)
