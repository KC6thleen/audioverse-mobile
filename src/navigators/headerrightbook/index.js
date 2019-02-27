import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { download, addLocalFiles } from 'src/actions'
import { getBook } from 'src/reducers/selectors'

import HeaderRightBook from './HeaderRightBook'

const mapStateToProps = (state) => ({
  items: getBook(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    download,
    addLocalFiles,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBook)
