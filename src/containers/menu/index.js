import { connect } from 'react-redux'

import { getLanguage } from 'src/reducers/selectors'

import Menu from './Menu'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

export default connect(mapStateToProps)(Menu)
