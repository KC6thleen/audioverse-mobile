import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack, history } from 'src/actions'
import { getHistory } from 'src/reducers/selectors'

import History from './History'

const mapStateToProps = state => ({
  items: getHistory(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    remove: history.remove
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
