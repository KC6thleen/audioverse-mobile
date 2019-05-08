import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from 'src/actions'
import { getHistory } from 'src/reducers/selectors'

import Discover from './Discover'

const mapStateToProps = state => ({
  history: getHistory(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
