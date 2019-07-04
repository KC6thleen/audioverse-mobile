import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playPause } from 'src/actions'
import { getCurrentTrack } from 'src/reducers/selectors'

import MiniPlayer from './MiniPlayer'

const  mapStateToProps = state => ({
  track: getCurrentTrack(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    playPause
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)
