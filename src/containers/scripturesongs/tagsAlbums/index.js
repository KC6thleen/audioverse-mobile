import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsAlbums } from 'src/actions'
import { getTagsAlbums, getTagsAlbumsPagination } from 'src/reducers/selectors'

import TagsAlbums from './TagsAlbums'

const mapStateToProps = state => ({
  items: getTagsAlbums(state),
  pagination: getTagsAlbumsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadTagsAlbums
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsAlbums)
