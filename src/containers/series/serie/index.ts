import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { loadSerie } from '../../../actions'
import { getSerie, getSeriePagination } from '../../../reducers/selectors'

import List from '../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getSerie(state),
  pagination: getSeriePagination(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadSerie,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
