<script lang="ts">

import ButtonMenu from "../components/ButtonMenu.svelte";

import {GameRecord, Views} from "../types";
import {invoke} from "@tauri-apps/api/tauri";
import {onMount} from "svelte";
import {goTo} from "../utils";

export let gameRecord: GameRecord

onMount(async () => {
    invoke('add_game_data', {gameRecord: JSON.stringify(gameRecord)}).then((message) => {
        console.log(message)
    })
})

</script>

<main>
    <h1>Game Over</h1>

    <div class="lines-container">
        <span>Score:</span><span>{gameRecord.score}</span>
        <span>Level:</span><span>{gameRecord.maxLevel}</span>
    </div>

    <div class="buttons-container">
        <ButtonMenu focus={true}  handleClick={goTo} params={[Views.game]} text={"Play Again"}/>
        <ButtonMenu focus={true}  handleClick={goTo} params={[Views.menu]} text={"Menu"}/>
    </div>

</main>


<style>
    main {
        width: 100%;
        display: grid;
        grid-template-columns: auto;
        grid-auto-rows: auto auto auto;
        grid-gap: 1rem;
        justify-content: center;
        align-items: center;
        justify-items: center;

    }

    h1 {
        font-size: 3rem;
    }

    div {
        font-size: 2rem;
    }

    .lines-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
    }
    .buttons-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;

    }

    @keyframes drop {
        0% {
            transform: translateY(-500px);
        }

        40% {
            transform: translateY(0px);
        }

        70% {
            transform: translateY(25%);
        }
        100% {
            transform: translateY(0px);
        }
    }

    main > * {
        animation: drop 0.3s;
    }
</style>