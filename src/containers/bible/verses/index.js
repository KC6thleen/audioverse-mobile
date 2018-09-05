import { connect } from 'react-redux'

import { getBible } from 'src/reducers/selectors'

import BibleVerses from './BibleVerses'

const mapStateToProps = (state) => ({
  bible: getBible(state)
})

export default connect(mapStateToProps)(BibleVerses)
