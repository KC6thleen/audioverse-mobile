import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from '../../actions'

import List from './List'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  localActions: bindActionCreators({
    resetAndPlayTrack,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(List)
