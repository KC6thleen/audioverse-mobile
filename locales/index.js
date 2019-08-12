"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var RNLocalize = __importStar(require("react-native-localize"));
var i18n_js_1 = __importDefault(require("i18n-js"));
var de_json_1 = __importDefault(require("./de.json"));
var en_json_1 = __importDefault(require("./en.json"));
var es_json_1 = __importDefault(require("./es.json"));
var fr_json_1 = __importDefault(require("./fr.json"));
var ja_json_1 = __importDefault(require("./ja.json"));
var ru_json_1 = __importDefault(require("./ru.json"));
var zh_json_1 = __importDefault(require("./zh.json"));
var translations = {
    de: de_json_1.default,
    en: en_json_1.default,
    es: es_json_1.default,
    fr: fr_json_1.default,
    ja: ja_json_1.default,
    ru: ru_json_1.default,
    zh: zh_json_1.default,
};
var setI18nConfig = function () {
    // fallback if no available language fits
    var fallback = { languageTag: "en", isRTL: false };
    var _a = RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
        fallback, languageTag = _a.languageTag, isRTL = _a.isRTL;
    // update layout direction
    react_native_1.I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n_js_1.default.translations = translations;
    i18n_js_1.default.locale = languageTag;
    i18n_js_1.default.defaultSeparator = '/';
};
setI18nConfig();
exports.default = i18n_js_1.default;
