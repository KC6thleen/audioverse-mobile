import { connect } from 'react-redux'

import { AppState } from '../../store'
import { getLanguage } from '../../reducers/selectors'

import TabBarLabel from './TabBarLabel'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

export default connect(mapStateToProps)(TabBarLabel)
