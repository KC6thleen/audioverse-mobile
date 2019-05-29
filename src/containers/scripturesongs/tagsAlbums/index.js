import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsAlbums } from 'src/actions'
import { getTagsAlbums, getTagsAlbumsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getTagsAlbums(state),
  pagination: getTagsAlbumsPagination(state),
  subtitleExtractor: () => null,
  avatarExtractor: item => item.photo86,
  onPress: item => props.navigation.navigate({
    routeName: 'TagAlbum',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadTagsAlbums,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
