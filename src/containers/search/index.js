import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from 'src/actions'

import Search from './Search'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(Search)
