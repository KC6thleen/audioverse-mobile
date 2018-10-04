import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSerie, resetAndPlayTrack } from 'src/actions'
import { getSerie, getSeriePagination } from 'src/reducers/selectors'

import Serie from './Serie'

const mapStateToProps = (state) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadSerie,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Serie)
