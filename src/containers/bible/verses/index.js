import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBibleVerses } from 'src/actions'
import { getBible } from 'src/reducers/selectors'

import BibleVerses from './BibleVerses'

const mapStateToProps = (state) => ({
  bible: getBible(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadBibleVerses
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleVerses)
