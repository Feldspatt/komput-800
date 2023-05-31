### What is it?

A calculus game, 
 - you must solve the math operations before the timer run down. 
 - successful answers increment the timer.
 - game data are locally saved.
 
A training mode is available, letting you pick the operation types and the difficulty level without time pressure.
In a separate window, you can assess statistics about the average duration you spend to solve x operation type at each y level.

### Why is it?

I wanted to practice the following points:
- Svelte
- Tauri
- Chart.js
- JSON Serialization in Rust

### Current state:

Things works but:
- Code could be cleaned, 
- UI could be improved, 
- some additional features could be implemented,
- operations difficulty definitely needs smoothing.

Some related features that I will look to implement:
- sending game data to a remote server.
- some sort of multiplayer/users communication.
- an "overdrive" mechanic to spice the gameplay.
- more stats options,
- save game data in a more appropriate place.

### Afterthoughts:

Tauri is quite simple to get into, specially for one who is already familiar with Cargo and Vite.
Still I learned a lot of little things about Svelte, Rust deserialization and Chart.js.
While rough in its form, the game is actually good at making one better at calculus.
