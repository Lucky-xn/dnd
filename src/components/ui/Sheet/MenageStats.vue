<template>
  <div
    class="flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 py-1 rounded-md relative group"
  >
    <span class="font-semibold flex items-center justify-center text-xl">{{
      title
    }}</span>
    <span
      v-if="showInputChange === false"
      class="w-full h-full text-center font-bold text-3xl flex items-center justify-center absolute top-2 left-0"
    >
      {{ defaultStatus }}
    </span>
    <input
      type="number"
      v-else
      v-model="defaultStatus"
      min="0"
      max="100"
      ref="inputRef"
      @keyup.esc="cancelEdit"
      @keydown.enter="saveChanges"
      @blur="saveChanges"
      class="absolute z-20 top-2 left-0 w-full h-full text-center text-3xl font-bold outline-none"
    />
    <div
      class="absolute z-10 flex items-center inset-0 bg-neutral-950/30 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      @click="handleEditClick"
      v-show="!showInputChange"
    >
      <Icon
        icon="mdi:lead-pencil"
        class="h-3 w-3 absolute top-3 right-2 text-neutral-200 cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, nextTick, ref, watch } from "vue";

const showInputChange = ref(false);
const inputRef = ref(null);

const emit = defineEmits(["update:stats"]);

const props = defineProps({
  title: {
    type: String,
    default: "N/A",
  },
  stats: {
    type: Number,
    default: 0,
  },
});

const defaultStatus = ref(props.stats);

const handleEditClick = async () => {
  showInputChange.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const cancelEdit = () => {
  defaultStatus.value = props.stats;
  showInputChange.value = false;
};

const saveChanges = () => {
  emit("update:stats", defaultStatus.value);
  showInputChange.value = false;
};

watch(
  () => props.stats,
  (newValue) => {
    defaultStatus.value = newValue;
  }
);
</script>
