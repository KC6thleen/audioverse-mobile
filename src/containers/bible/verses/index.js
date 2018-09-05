import { connect } from 'react-redux'

import { getBible } from '../../../reducers/selectors'

import BibleVerses from './BibleVerses'

const mapStateToProps = (state) => ({
  bible: getBible(state)
})

export default connect(mapStateToProps)(BibleVerses)
