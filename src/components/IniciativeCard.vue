<template>
  <div class="border rounded-md border-neutral-700 bg-neutral-900 p-2">
    <div class="flex gap-2">
      <div class="flex flex-col gap-0.1 px-2 py-1">
        <label class="text-xs font-semibold text-gray-500">Name:</label>
        <span class="text-sm text-white font-medium">{{ data.name }}</span>
      </div>
      <div class="flex flex-col gap-0.1 px-2 py-1">
        <label class="text-xs font-semibold text-gray-500">Iniciativa:</label>
        <span class="text-sm text-white font-medium">{{
          data.iniciative
        }}</span>
      </div>
      <div class="flex flex-col gap-0.1 px-2 py-1">
        <label class="text-xs font-semibold text-gray-500">CA:</label>
        <span class="text-sm text-white font-medium">{{ data.ca }}</span>
      </div>
    </div>

    <LifeMenagement :hp="data.hp" />
  </div>
</template>

<script setup>
import LifeMenagement from "./ui/LifeMenagement.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
