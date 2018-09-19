import { connect } from 'react-redux'

import { getLanguage } from 'src/reducers/selectors'

import TabBarLabel from './TabBarLabel'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

export default connect(mapStateToProps)(TabBarLabel)
