import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagAlbum, resetAndPlayTrack } from 'src/actions'
import { getTagAlbum, getTagAlbumPagination } from 'src/reducers/selectors'

import TagAlbum from './TagAlbum'

const mapStateToProps = (state) => ({
  items: getTagAlbum(state),
  pagination: getTagAlbumPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadTagAlbum,
    resetAndPlayTrack
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagAlbum)
