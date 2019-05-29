import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadTags } from 'src/actions'
import { getTags, getTagsPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getTags(state),
  pagination: getTagsPagination(state),
  titleExtractor: item => item.name,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Tag',
    params: {
      url: item.recordingsURI,
      title: item.name,
    },
  }),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadData: loadTags,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
