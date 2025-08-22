<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col">
        <span class="text-gray-500">Race:</span>
        <input
          type="text"
          placeholder="ex:. Human"
          :value="formData.race"
          @input="$emit('update:race', $event.target.value)"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
      <div class="flex flex-1 flex-col">
        <span class="text-gray-500">Class:</span>
        <input
          type="text"
          placeholder="ex:. Bard"
          :value="formData.characterClass"
          @input="$emit('update:characterClass', $event.target.value)"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
    </div>
    
    <div class="flex gap-2">
      <div class="flex flex-1 flex-col">
        <span class="text-gray-500">Origin:</span>
        <input
          type="text"
          placeholder="ex:. Hero"
          :value="formData.origin"
          @input="$emit('update:origin', $event.target.value)"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
      <div class="flex flex-1 flex-col">
        <span class="text-gray-500">Alignment:</span>
        <input
          type="text"
          :value="formData.alignment"
          @input="$emit('update:alignment', $event.target.value)"
          placeholder="ex:. Chaotic Good"
          class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
          required
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:race', 'update:characterClass', 'update:origin', 'update:alignment']);

defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
</script>