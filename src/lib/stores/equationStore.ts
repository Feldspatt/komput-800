import {writable} from "svelte/store";
import {OperationTypes, EquationSettings} from "../types";

function createEquationStore() {
    let equationSettings = new EquationSettings(
        1,
        [
            OperationTypes.ADDITION,
            OperationTypes.SUBTRACTION,
            OperationTypes.MULTIPLICATION,
            OperationTypes.DIVISION
        ]
    )

    const { subscribe, set, update } = writable(equationSettings)

    return {
        subscribe,
        set,
        updateEquation: () =>  {
            equationSettings.setEquation();
            update(n => n)
            console.log("update triggered")
        },
        level: equationSettings.level,
        operationTypes: equationSettings.operationTypes,
        equation: equationSettings.equation,
        reset: () => set(0)
    };
}

export const equationStore = createEquationStore();