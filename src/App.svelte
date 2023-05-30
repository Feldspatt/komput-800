<script lang="ts">

    import {screenStore} from './lib/stores/screenStore';
    import MenuScreen from "./lib/screens/MenuScreen.svelte";
    import GameScreen from "./lib/screens/GameScreen.svelte";
    import {Views} from "./lib/types";
    import TrainSettingsScreen from "./lib/screens/TrainingSettingsScreen.svelte";
    import TrainingScreen from "./lib/screens/TrainingScreen.svelte";

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            screenStore.goTo(Views.menu);
        }
    });
</script>

{#if $screenStore === Views.menu}
    <MenuScreen />
{:else if $screenStore === Views.game}
    <GameScreen />
{:else if $screenStore === Views.trainingSetttings}
    <TrainSettingsScreen />
{:else if $screenStore === Views.training}
    <TrainingScreen/>
{/if}