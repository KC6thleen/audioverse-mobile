import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from '../../actions'

import Search from './Search'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Search)
