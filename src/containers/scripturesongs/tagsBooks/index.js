import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTagsBooks } from 'src/actions'
import { getTagsBooks, getTagsBooksPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getTagsBooks(state),
  pagination: getTagsBooksPagination(state),
  titleExtractor: item => item.name,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'TagBook',
    params: {
      url: item.recordingsURI,
      title: item.name,
    },
  }),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadTagsBooks,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
