import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadStories } from 'src/actions'
import { getStories, getStoriesPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getStories(state),
  pagination: getStoriesPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Story',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadStories,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
