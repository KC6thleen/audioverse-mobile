import React from 'react'
import Slide from './Slide'
import defaultImage from '../../../assets/av-logo.png'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<Slide image={defaultImage} header="" />).toJSON()
  expect(tree).toMatchSnapshot()
})
