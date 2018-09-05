import { connect } from 'react-redux'

import { loadSerie, resetAndPlayTrack } from 'src/actions'
import { getSerie, getSeriePagination } from 'src/reducers/selectors'

import Serie from './Serie'

const mapStateToProps = (state) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadSerie(false, false, url)),
  loadMore: (url) => dispatch(loadSerie(true, false, url)),
  refresh: (url) => dispatch(loadSerie(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Serie)
