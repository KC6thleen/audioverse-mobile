import { connect } from 'react-redux'

import { changeLanguage } from 'src/actions'
import { getLanguage } from 'src/reducers/selectors'

import Settings from './Settings'

const mapStateToProps = (state) => ({
  language: getLanguage(state)
})

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language) => dispatch(changeLanguage(language))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
