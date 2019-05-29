import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from 'src/actions'

import List from './List'

const mapDispatchToProps = dispatch => ({
  localActions: bindActionCreators({
    resetAndPlayTrack,
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(List)
