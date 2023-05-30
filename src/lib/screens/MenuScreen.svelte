<script lang="ts">
    import ButtonMenu from "../components/ButtonMenu.svelte";

    import {Views} from "../types";
    import {goTo, openStatsWindow} from "../utils";



    let openStats = async () => {
        openStatsWindow()
    }

</script>

<div id="container">

    <h1>
        Komput-800
    </h1>

    <div id="options">
        <ButtonMenu focus={true}  handleClick={goTo} params={[Views.game]} text={"Play"}/>
        <ButtonMenu handleClick={goTo} params={[Views.trainingSetttings]} text={"Train"}/>
        <ButtonMenu handleClick={openStats} text={"Stats"}/>
    </div>

</div>

<style>
    #container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        justify-content: space-around;
        align-content: center;
        height: 100vh;
    }

    #options {
        display: grid;
        grid-template-columns: max-content;
        grid-template-rows: 1fr 1fr 1fr;
        justify-content: center;
        grid-gap:0.5rem;
    }
</style>