<template>

   <div
        class="row-start-2 flex flex-col items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-md py-2"
      >
        <span class="font-semibold"> Atributos </span>
        <div
          v-for="att in filteredAttributes"
          :key="att.id"
          class="w-full text-center px-1"
        >
          <div class="flex flex-col border border-neutral-600 rounded-md">
            <div class="text-sm text-gray-400">
              <!-- {{ formatModifier(attribute.value) }} -->
            </div>
            <div class="text-2xl font-bold">{{ att.value }}</div>
            <div class="text-sm font-semibold text-gray-300">
              {{ att.name }}
            </div>
          </div>
        </div>
      </div>

</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  attributes: {
   type: Array,
   required: true
  }
});

const filteredAttributes = computed(() => {
   return props.attributes || {name: '', value: 0}
})

</script>