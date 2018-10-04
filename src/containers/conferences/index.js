import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadConferences } from 'src/actions'
import { getConferences, getConferencesPagination } from 'src/reducers/selectors'

import Conferences from './Conferences'

const mapStateToProps = (state) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadConferences
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Conferences)
