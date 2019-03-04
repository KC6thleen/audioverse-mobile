import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getCurrentTrack } from 'src/reducers/selectors'

import Transcript from './Transcript'

const mapStateToProps = state => ({
  track: getCurrentTrack(state),
})

export default connect(mapStateToProps)(Transcript)
