import { connect } from 'react-redux'

import { loadConferences } from 'src/actions'
import { getConferences, getConferencesPagination } from 'src/reducers/selectors'

import Conferences from './Conferences'

const mapStateToProps = (state) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadConferences(false, false)),
  loadMore: () => dispatch(loadConferences(true, false)),
  refresh: () => dispatch(loadConferences(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Conferences)
