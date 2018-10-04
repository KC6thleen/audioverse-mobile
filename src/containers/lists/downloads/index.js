import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack } from 'src/actions'
import { getDownloads } from 'src/reducers/selectors'

import Downloads from './Downloads'

const mapStateToProps = state => ({
  items: getDownloads(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)
