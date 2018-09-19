import { connect } from 'react-redux'

import { getBible } from 'src/reducers/selectors'

import HeaderRightBibleVerses from './HeaderRightBibleVerses'

const mapStateToProps = state => ({
  bible: getBible(state)
})

export default connect(mapStateToProps)(HeaderRightBibleVerses)
