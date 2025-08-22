<template>

   <div
        class="row-start-2 flex flex-col items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-md py-2 relative group"
      >
        <span class="font-semibold"> Atributos </span>
        <div
          v-for="att in filteredDefaultAttributes"
          :key="att.id"
          class="w-full text-center px-1"
        >
          <div class="flex flex-col border border-neutral-600 rounded-md">
            <div class="text-sm text-gray-400">
              {{ formatModifier((filteredCharactersAttributes.find(item => item.id === att.id)?.value) ?? 10) }}
            </div>
            <div class="text-2xl font-bold">
              {{
                (filteredCharactersAttributes.find(item => item.id === att.id)?.value) ?? 10
              }}
            </div>
            <div class="text-sm font-semibold text-gray-300">
              {{ att.name }}
            </div>
          </div>
        </div>
      </div>

</template>

<script setup>
import { computed, ref } from 'vue';

const showInputChange = ref(false);
const inputRef = ref(null);

const props = defineProps({
  defaultAttributes: {
   type: Array,
   required: true
  },
  charactersAttributes: {
   type: Array,
   required: true
  }
});

const formatModifier = (score) => {
  if (score === undefined || score === null) return "+0";
  const modifier = Math.floor((score - 10) / 2);
  return modifier >= 0 ? `+${modifier}` : modifier.toString();
};

const filteredDefaultAttributes = computed(() => {
   return Array.isArray(props.defaultAttributes) ? props.defaultAttributes : []
})

const filteredCharactersAttributes = computed(() => {
   return Array.isArray(props.charactersAttributes) ? props.charactersAttributes : []
})

const handleEditClick = async () => {
  showInputChange.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const cancelEdit = () => {
  defaultStatus.value = props.stats;
  showInputChange.value = false;
};

</script>