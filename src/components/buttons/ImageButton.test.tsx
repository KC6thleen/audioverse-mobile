import React from 'react'
import ImageButton from './ImageButton'
import { defaultImage } from '../../styles'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<ImageButton onPress={() => {}} source={defaultImage} />).toJSON()
  expect(tree).toMatchSnapshot()
})
