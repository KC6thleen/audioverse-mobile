import { connect } from 'react-redux'

import { loadPresenter, resetAndPlayTrack } from '../../../actions'
import { getPresenter, getPresenterPagination } from '../../../reducers/selectors'

import Presenter from './Presenter'

const mapStateToProps = (state) => ({
  items: getPresenter(state),
  pagination: getPresenterPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: (url) => dispatch(loadPresenter(false, false, url)),
  refresh: (url) => dispatch(loadPresenter(false, true, url)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
