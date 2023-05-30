import {writable} from "svelte/store";
import {Views} from "../types";
import TempScreen from "../screens/TempScreen.svelte";

function createView() {
    const { subscribe, set } = writable(Views.menu);

    return {
        subscribe,
        set,
        goTo: (targetView) => {
            set(TempScreen)
            setTimeout(() => {
                screenStore.set(targetView)
            }, 1)
        },
        reset: () => set(0)
    };
}

export const screenStore = createView()