<script lang="ts">

    import {OperationTypes, Views} from "../types";
    import ButtonMenu from "../components/ButtonMenu.svelte";
    import {equationStore} from "../stores/equationStore";
    import {goTo} from "../utils";

    $equationStore.level = 10;

    export let operations = [
        ["Addition", OperationTypes.ADDITION],
        ["Subtraction", OperationTypes.SUBTRACTION],
        ["Multiplication", OperationTypes.MULTIPLICATION],
        ["Division", OperationTypes.DIVISION],
    ]

</script>

<main>
    <h5>Level</h5>
    <div class="range">
        <input autofocus type="range" min="1" max="100" bind:value={$equationStore.level} />
        <span>{$equationStore.level}</span>
    </div>

    <h5>Operations</h5>
        <div class="operations">
            {#each operations as [name, operation]}
                <label for={operation} class:checked={false} class="checkbox">
                    <span>{name}</span>
                    <input id={operation} type="checkbox" checked bind:group={$equationStore.operationTypes} value="{operation}" />
                    <span class="box"></span>
                </label>
            {/each}
        </div>

    <ButtonMenu focus={true}  handleClick={goTo} params={[Views.training]} text={"Play"}/>
</main>
<style>
    main {
        font-size: 1.2rem;
        display:grid;
        grid-template-columns: 1fr;
        justify-content: center;
        justify-items: center;

        align-content: center;

        gap: 1rem;
    }

    h5 {
        margin: 0;
        font-size: 1.5rem;
    }

    .range {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .operations {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
        gap: 1rem;
        align-items: center;
    }

    input[type="checkbox"] {
        visibility: visible;
        position: absolute;
        opacity: 0;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 1rem;
        cursor: pointer;
    }
    .box {
        display: block;
        width: 2rem;
        height: 2rem;
        border: 2px solid var(--medium-grey);
        transform: skewX(10deg);
        transition: 0.1s;
        border-radius: 5px;
    }

    input[type="checkbox"]:checked + .box {
        transform: skewX(-10deg) translateX(20px);
        border-color: var(--dark-grey);
        background-color: var(--medium-grey);
    }

    input[type="checkbox"]:focus + .box {
        border-color: var(--focus-color);
    }

</style>