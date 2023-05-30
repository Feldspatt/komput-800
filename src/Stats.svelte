<script lang="ts">
    import Chart from "./lib/components/Chart.svelte";
    import {invoke} from "@tauri-apps/api/tauri";

    export let promise = new Promise(async (resolve, reject) => {
        const message: string = await invoke('get_game_data')
        const curves = []

        let json_message = JSON.parse(message)

        for (let operation of json_message) {
            switch (operation.label) {
                case "Additions":
                    operation.color = "red"
                    break
                case "Multiplications":
                    operation.color = "blue"
                    break
                case "Subtractions":
                    operation.color = "green"
                    break
                case "Divisions":
                    operation.color = "yellow"
                    break
            }

            operation.data = map_data(operation.data)
            curves.push(operation)
        }
        resolve(curves)
    })

    function map_data(data){
        return Object.entries(data).map(([key, value]) => {
            return {x:parseInt(key),y:value}
        })
    }

</script>

<div>
    {#await promise}
        <p>Chart incoming</p>
    {:then value}
        <Chart curves={value} />
    {/await}
</div>


<style>
    div {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        align-content: center;
    }


</style>