import { connect } from 'react-redux'

import { resetAndPlayTrack } from 'src/actions'
import { getDownloads } from 'src/reducers/selectors'

import Downloads from './Downloads'

const mapStateToProps = state => ({
  items: getDownloads(state)
})

const mapDispatchToProps = dispatch => ({
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)
