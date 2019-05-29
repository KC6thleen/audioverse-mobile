jest.mock('i18n-js', () => ({
  t: jest.fn(translation => translation),
  currentLocale: jest.fn(() => 'en')
}))
