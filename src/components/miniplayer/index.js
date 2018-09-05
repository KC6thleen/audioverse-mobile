import { connect } from 'react-redux'

import { playPause } from 'src/actions'
import { getCurrentTrack, getPlaybackState } from 'src/reducers/selectors'

import MiniPlayer from './MiniPlayer'

const  mapStateToProps = state => ({
  state: getPlaybackState(state),
  track: getCurrentTrack(state)
})

const mapDispatchToProps = dispatch => ({
  playPause: () => dispatch(playPause())
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)
