import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { getCurrentTrack } from '../../../reducers/selectors'

import Transcript from './Transcript'

const mapStateToProps = (state: AppState) => ({
  track: getCurrentTrack(state),
})

export default connect(mapStateToProps)(Transcript)
