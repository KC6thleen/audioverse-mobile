import { connect } from 'react-redux'

import { getLanguage } from 'src/reducers/selectors'

import HeaderTitle from './HeaderTitle'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

export default connect(mapStateToProps)(HeaderTitle)
