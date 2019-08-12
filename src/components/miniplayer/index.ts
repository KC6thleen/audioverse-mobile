import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import { playPause } from '../../actions'
import { getCurrentTrack } from '../../reducers/selectors'

import MiniPlayer from './MiniPlayer'

const  mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    playPause,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)
