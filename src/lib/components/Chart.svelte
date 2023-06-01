<script>

    import {onMount} from "svelte";
    import Chart from 'chart.js/auto';

    let chart;
    export let curves = [];

    onMount(async () => {
        const ctx = chart;
        const data = {
            datasets: []
        };

        for (let i = 0; i < curves.length; i++) {
            data.datasets.push({
                label: curves[i].label,
                data: curves[i].data,
                fill: false,
                borderColor: curves[i].color,
                tension: 0.5
            })
        }

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontColor: '#333',
                            usePointStyle:true,
                        }
                    }
                //     tooltip: {
                //         callbacks: {
                //             label: function(context) {
                //                 return "jean";
                //             }
                //         }
                //     }
                },
                scales: {
                    y: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Duration (ms)'
                        }
                    },
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Level'
                        }
                    }
                }
            }
        });
    })
</script>

<div>
    <canvas id="chart" bind:this={chart}></canvas>
</div>

<style>
    div {
        padding: 2rem;
    }

    canvas {
        padding: 1rem;
        background-color: #ffffff;
        border: 1px solid #000000;
    }
</style>