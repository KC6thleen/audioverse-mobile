import { connect } from 'react-redux'

import { getLanguage } from 'src/reducers/selectors'

import DrawerLabel from './DrawerLabel'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

export default connect(mapStateToProps)(DrawerLabel)
