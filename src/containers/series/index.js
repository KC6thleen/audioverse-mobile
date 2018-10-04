import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSeries } from 'src/actions'
import { getSeries, getSeriesPagination } from 'src/reducers/selectors'

import Series from './Series'

const mapStateToProps = (state) => ({
  items: getSeries(state),
  pagination: getSeriesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadSeries
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Series)
