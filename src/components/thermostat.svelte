<div class="thermostat">
  <h2>Temperature</h2>
  <div class="temperature">{temperature}{temperature_unit_short}</div>
  <button on:click={increment}>+</button>
  <button on:click={decrement}>-</button>
</div>

<style>
  .thermostat > .temperature {
    font-size: 4em;
    font-weight: 700;
  }
</style>

<script lang="ts">
  let bounds = { temperature: { min: 0, max: 40} };
  export let temperature: number = 0;
  const temperature_step: number = 0.5;
  let temperature_unit_short = "\u00B0C";

  function increment() {
    temperature = Math.min(bounds.temperature.max, temperature + temperature_step);
  }

  function decrement() {
    temperature = Math.max(bounds.temperature.min, temperature - temperature_step);
  }
</script>

