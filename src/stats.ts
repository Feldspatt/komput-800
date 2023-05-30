import "./styles.css";
import Stats from "./Stats.svelte";

const app = new Stats({
    target: document.getElementById("stats"),
});

export default app;