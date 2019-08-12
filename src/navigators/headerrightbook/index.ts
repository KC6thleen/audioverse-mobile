import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../store'
import { download } from '../../actions'
import { addLocalFiles } from '../../store/localFiles/actions'
import { getBook } from '../../reducers/selectors'

import HeaderRightBook from './HeaderRightBook'

const mapStateToProps = (state: AppState) => ({
  items: getBook(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    download,
    addLocalFiles,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBook)
