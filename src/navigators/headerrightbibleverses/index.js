import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getBible } from 'src/reducers/selectors'
import { setBibleVersion, resetAndPlayTrack } from 'src/actions'

import HeaderRightBibleVerses from './HeaderRightBibleVerses'

const mapStateToProps = state => ({
  bible: getBible(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setBibleVersion,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBibleVerses)
