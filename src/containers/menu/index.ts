import { connect } from 'react-redux'

import { AppState } from '../../store'
import { getLanguage } from '../../reducers/selectors'

import Menu from './Menu'

const mapStateToProps = (state: AppState) => ({
  language: getLanguage(state),
})

export default connect(mapStateToProps)(Menu)
