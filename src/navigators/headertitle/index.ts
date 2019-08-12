import { connect } from 'react-redux'

import { AppState } from '../../store'
import { getLanguage } from '../../reducers/selectors'

import HeaderTitle from './HeaderTitle'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

export default connect(mapStateToProps)(HeaderTitle)
