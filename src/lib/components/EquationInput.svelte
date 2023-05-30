<script>
    import {equationStore} from "../stores/equationStore";

    export let
        handleInput,
        animTrigger = false,
        equationString = $equationStore.equation.string;


    /**
     * Trigger the UI update and animation.
     * @return {void}
     */
    function onEquationUpdate(){
        const newEquation = $equationStore.equation.string
        animTrigger = false;
        setTimeout(() => animTrigger = true, 10)
        setTimeout(() => equationString = newEquation , 100)
    }

    $: $equationStore, onEquationUpdate();


</script>

<div class="container">
    <div class:shake={animTrigger}>{ equationString}</div>
    <input autofocus on:input={handleInput} type="text">
</div>

<style>
    .container {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        align-items: center;
    }

    input {
        all:initial;

        padding: 0.5rem;
        font-size: 2rem;
        border: 2px solid #ccc;
        text-align: center;
        width: 10rem;
        background-color: white
    }

    input:focus{
        border: 2px solid #666;
    }

    @keyframes shake {
        50% {
            transform: skewX(-60deg) translateX(10px);
        }
    }

    .shake {
        animation: shake 0.2s linear normal;
    }
</style>