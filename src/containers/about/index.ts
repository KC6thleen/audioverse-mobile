import { connect } from 'react-redux'

import { AppState } from '../../store'
import { getLanguage } from '../../reducers/selectors'

import About from './About'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

export default connect(mapStateToProps)(About)
