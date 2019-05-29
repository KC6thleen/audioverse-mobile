import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getTopics, getTopicsPagination } from 'src/reducers/selectors'
import { loadTopics } from 'src/actions'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getTopics(state),
  pagination: getTopicsPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Topic',
    params: {
      url: item.recordingsURI,
      title: item.title,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTopics,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
