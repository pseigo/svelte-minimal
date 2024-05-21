<div class="p-4 rounded-xl border
            bg-slate-50 border-slate-100">

  <div class="flex flex-col items-center gap-2">
    <label for="temperature-value"
           class="text-xl"
      >Temperature</label>

    <div id="temperature-value"
         class="text-6xl font-medium
                text-blue-500"
      >{temperature}{temperature_unit_short}</div>

    <div class="flex flex-row items-center gap-2">
      <TemperatureButton on:click={decrement}>-</TemperatureButton>
      <TemperatureButton on:click={increment}>+</TemperatureButton>
    </div>

  </div>

</div>

<style>
</style>

<script lang="ts">
  import TemperatureButton from "./thermostat/temperature_button.svelte";

  export let temperature: number = 17;

  const bounds = { temperature: { min: 0, max: 40} };
  const temperature_step: number = 0.5;
  const temperature_unit_short = "\u00B0C";

  function increment() {
    temperature = Math.min(bounds.temperature.max, temperature + temperature_step);
  }

  function decrement() {
    temperature = Math.max(bounds.temperature.min, temperature - temperature_step);
  }
</script>

