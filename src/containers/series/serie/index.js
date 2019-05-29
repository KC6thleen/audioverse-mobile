import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadSerie } from 'src/actions'
import { getSerie, getSeriePagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSerie,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
