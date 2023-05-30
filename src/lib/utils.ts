import { WebviewWindow } from '@tauri-apps/api/window'
import {Views} from "./types";
import {screenStore} from "./stores/screenStore";

export let goTo = (targetView: Views) => {
    screenStore.goTo(targetView)
}
export function openStatsWindow() {
    const webview = new WebviewWindow('myLilLabel', {
        title: 'Stats',
        url: '/stats.html',
        width: 1280,
        height: 768,
    })
// since the webview window is created asynchronously,
// Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
    webview.once('tauri://created', function () {
        // webview window successfully created
        console.log("successfully created second window")
    })
    webview.once('tauri://error', function (e) {
        // an error occurred during webview window creation
        console.log("error while creating second window:", JSON.stringify(e))
    })
}