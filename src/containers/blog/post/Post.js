import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native'
import HTML from 'react-native-render-html'

import { fetchData } from "src/services"
import { Endpoints } from "src/constants"

const { width: viewportWidth } = Dimensions.get('window')

const htmlStyles = {
  p: {
    fontSize: 20,
    marginBottom: 20,
  },
  li: {
    fontSize: 20,
  },
}

class Post extends PureComponent {

  state = {
    post: null,
    loading: true,
  }

  async componentDidMount () {
    if (!this.state.post) {
      const { params } = this.props.navigation.state
      const { result } = await fetchData(params.url)
      console.log(result)
      if (result.length) {
        this.setState({post: result[0].posts, loading: false})
      } else {
        this.setState({loading: false})
      }
    }
  }

  onLinkPress = (event, href) => {
    let routeName = ''
    let id = null
    let url = ''

    if (href.match("/conferences/")) {
      routeName = 'Conference'
      id = href.match(/\d+/)[0]
      url = `${Endpoints.conference}/${id}`
    } else if (href.match("/series/")) {
      routeName = 'Serie'
      id = href.match(/\d+/)[0]
      url = `${Endpoints.serie}/${id}`
    } else if (href.match("/sponsors/")) {
      routeName = 'Sponsor'
      id = href.match(/\d+/)[0]
      url = `${Endpoints.sponsor}/${id}`
    }

    if (routeName !== '') {
      this.props.navigation.navigate({
        routeName: routeName,
        params: {
          id,
          url,
        }
      })
    } else {
      Linking.openURL(href).catch(err => console.error(err))
    }
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        {this.state.loading && 
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color="#03A9F4"
              style={{margin: 50}}
            />
          </View>
        }
        {!this.state.loading && this.state.post &&
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{uri: this.state.post.image}} />
            <Text style={styles.title}>{this.state.post.title}</Text>
            <HTML
              html={this.state.post.body}
              containerStyle={styles.htmlContainer}
              tagsStyles={htmlStyles}
              onLinkPress={this.onLinkPress} />
          </View>
        }
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
  },
  image: {
    width: viewportWidth,
    height: viewportWidth * 0.52,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  htmlContainer: {
    paddingHorizontal: 20,
  }
})

export default Post
