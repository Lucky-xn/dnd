<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-col">
      <span class="text-gray-500">System:</span>
      <select 
        :value="formData.systemSelected"
        @input="$emit('update:systemSelected', $event.target.value)"
        class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" 
        placeholder="ex:. D&D 5E" 
        required
      >
        <option v-for="sys in systems" :key="sys.id" :value="sys.name">{{ sys.name }}</option>
      </select>
    </div>
    
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col">
        <span class="text-gray-500">Name:</span>
        <input
          type="text"
          placeholder="ex:. Asylan"
          :value="formData.name"
          @input="$emit('update:name', $event.target.value)"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
      <div class="flex flex-col w-15">
        <span class="text-gray-500">Lv:</span>
        <input
          type="number"
          :value="formData.level"
          @input="$emit('update:level', Number($event.target.value))"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:systemSelected', 'update:name', 'update:level']);

defineProps({
  formData: {
    type: Object,
    required: true,
  },
  systems: {
    type: Array,
    default: () => [],
  },
});
</script>