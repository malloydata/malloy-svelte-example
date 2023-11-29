<script lang="ts">
  export let title = '';
  export let cardClass = '';
</script>

<div
  class={`p-4 bg-white drop-shadow-sm border border-gray-200 rounded-md overflow-hidden max-w-full w-fit flex flex-col gap-4 ${cardClass} `}
>
  <div class="text-base font-medium text-gray-500">{title}</div>
  <div class="overflow-hidden relative h-full"><slot /></div>
</div>
