import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getLanguage } from 'src/reducers/selectors'

import About from './About'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

export default connect(mapStateToProps)(About)
