<script lang="ts">

    import GameOverScreen from "./GameOverScreen.svelte";
    import {EquationRecord, GameRecord, OperationTypes} from "../types";
    import {timerBase, timerIncrement} from "../stores/settings";
    import EquationInput from "../components/EquationInput.svelte";
    import {equationStore} from "../stores/equationStore";


    equationStore.operationTypes = [
        OperationTypes.ADDITION,
        OperationTypes.SUBTRACTION,
        OperationTypes.MULTIPLICATION,
        OperationTypes.DIVISION
    ]

    $equationStore.level = 1
    equationStore.updateEquation()

    export let
        score: number = 0,
        timer: number = $timerBase,
        equationStartTime:Date = new Date(),
        gameRecord: GameRecord = null,
        isGameOver = false

    export const
        equationRecords = [],
        gameStartTime: Date = new Date()

    function tick() {
        timer -= 1;
        if (timer <= 0) {
            // game over

            const timeToAnswer = new Date().getTime() - equationStartTime.getTime();
            const gameDuration = new Date().getTime() - gameStartTime.getTime();

            equationRecords.push(
                new EquationRecord(
                    $equationStore.level,
                    $equationStore.equation,
                    0,
                    timeToAnswer,
                    false,
                ))

            gameRecord = new GameRecord(
                $equationStore.level,
                gameDuration,
                score,
                new Date(),
                equationRecords
            )

            isGameOver = true;
        }
        else {
            setTimeout(tick, 100);
        }
    }
    tick()

    function handleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        const answer = input.value;

        if (answer == $equationStore.equation.answer) {

            console.log("equation: " + $equationStore.equation.string)

            const timeToAnswer = new Date().getTime() - equationStartTime.getTime();

            const scoreIncrement = $equationStore.level * 10 + Math.ceil($equationStore.level*(30 - timeToAnswer/1000));

            equationRecords.push(
                new EquationRecord(
                    $equationStore.level,
                    $equationStore.equation,
                    scoreIncrement,
                    timeToAnswer,
                    true,
                ))

            $equationStore.level++;
            equationStore.updateEquation()
            equationStartTime = new Date();
            score += scoreIncrement;
            input.value = "";
            timer+= $timerIncrement;
        }
    }

</script>

{#if !isGameOver}
    <main>

        <span class="timer">{timer}</span>

        <EquationInput {handleInput}/>

    </main>
{:else}
    <GameOverScreen {gameRecord}/>
{/if}

<style>
    main {
        display: grid;
        grid-template-rows: auto auto;

        justify-items: center;
        align-items: center;
        height: 100vh;
        width: 100vw;

        margin: 0;
        padding: 0;
    }

    /*.container {*/
    /*    font-size: 2rem;*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    gap: 1rem;*/

    /*    align-items: center;*/
    /*}*/

    .timer {
        font-size: 5rem;
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

    /*@keyframes shake {*/
    /*    50% {*/
    /*        transform: skewX(-60deg) translateX(10px);*/
    /*    }*/
    /*}*/

    /*.shake {*/
    /*    animation: shake 0.2s linear normal;*/
    /*}*/
</style>