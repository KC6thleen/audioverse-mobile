import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagAlbum } from 'src/actions'
import { getTagAlbum, getTagAlbumPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state) => ({
  items: getTagAlbum(state),
  pagination: getTagAlbumPagination(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagAlbum,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
