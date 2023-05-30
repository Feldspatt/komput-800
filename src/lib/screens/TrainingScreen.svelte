<script lang="ts">
    import {equationStore} from "../stores/equationStore";
    import EquationInput from "../components/EquationInput.svelte";
    import {OperationTypes} from "../types";


    if($equationStore.operationTypes.length == 0) {
        console.warn("No operation types set, defaulting to all");

        $equationStore.operationTypes = [
            OperationTypes.ADDITION,
            OperationTypes.SUBTRACTION,
            OperationTypes.MULTIPLICATION,
            OperationTypes.DIVISION
        ]
    }

    equationStore.updateEquation()

    function handleInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        const answer = input.value;

        if (answer == $equationStore.equation.answer) {
            console.log("Correct!");

            equationStore.updateEquation()

            input.value = "";
        }
    }
</script>

<main>
    <h1>
        Level {$equationStore.level}
    </h1>
    <EquationInput {handleInput} />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
</style>