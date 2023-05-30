<script lang="ts">

    import {screenStore} from "../stores/screenStore"
    import {Views} from "../types";

    export let
        handleClick:(...args:any[]) => void = () => {},
        params:any[] = [],
        text = "Meep meep",
        focus = null

    function localHandleClick() {
        handleClick(...params)
    }


</script>

<button autofocus={focus} on:click={localHandleClick}>{text}</button>

<style>

    button {
        margin: 0;
        /*font-family: "Bebas Neue", sans-serif;*/
        font-size: 2rem;
        border-radius: 5px;
        border: 2px solid var(--medium-grey);
        background-color: var(--light-grey);
        padding: 0.4rem;
        text-align: center;
        transform: skewX(10deg);
    }

    @keyframes forward {
        0% {
            transform: skewX(10deg) translateX(0px);
        }
        100% {
            transform: skewX(-10deg) translateX(20px);
        }
    }
    button:focus, button:hover {
        outline: none;
        border-color: var(--dark-grey);
        animation: forward 0.1s linear normal forwards;
        background-color: white;
    }

    button:not(:focus):not(:hover) {
        transition: 0.5s;
    }

    button:focus {
        border-color: var(--focus-color);
    }
</style>