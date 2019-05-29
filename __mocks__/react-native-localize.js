jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: jest.fn(() => ({ languageTag: "en", isRTL: false }))
}))
