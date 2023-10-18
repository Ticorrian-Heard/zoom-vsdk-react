import * as ui from './dist/videosdk-ui-toolkit.js'

let uitoolKit = document.createElement('app-uitoolkit')
let previewKit = document.createElement('app-previewkit')

let UIToolKit = {
    openPreview: (/** @type {HTMLElement} */ container) => {
        container.append(previewKit)
    },
    closePreview: (/** @type {HTMLElement} */ container) => {
        container.removeChild(previewKit)
    },
    joinSession: (/** @type {HTMLElement} */ container, /** @type {Object} */ config) => {
        uitoolKit.setAttribute("config", JSON.stringify(config))
        container.append(uitoolKit)
    },
    closeSession: (/** @type {HTMLElement} */ container) => {
        container.removeChild(uitoolKit)
    },
    onSessionJoined: (/** @type {EventListenerOrEventListenerObject} */ callback) => {
        uitoolKit.addEventListener('sessionJoined', callback)
    },
    offSessionJoined: (/** @type {EventListenerOrEventListenerObject} */ callback) => {
        uitoolKit.removeEventListener('sessionJoined', callback)
    },
    onSessionClosed: (/** @type {EventListenerOrEventListenerObject} */ callback) => {
        uitoolKit.addEventListener('sessionClosed', callback)
    },
    offSessionClosed: (/** @type {EventListenerOrEventListenerObject} */ callback) => {
        uitoolKit.removeEventListener('sessionClosed', callback)
    }
};

export default UIToolKit;