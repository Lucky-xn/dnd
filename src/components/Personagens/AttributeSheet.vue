<template>
  <div
    class="row-start-2 flex flex-col items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-md py-2 relative group"
  >
    <span class="font-semibold"> Atributos </span>
    <div v-for="att in filteredDefaultAttributes" :key="att.id" class="w-full px-1">
      <div class="flex flex-col items-center border border-neutral-600 rounded-md">
        <span class="text-sm text-gray-400">
          {{
            formatModifier(
              filteredCharactersAttributes.find((item) => item.id === att.id)?.value ?? 10
            )
          }}
        </span>
        <input
          type="number"
          class="text-2xl font-bold w-10 text-center"
          :value="
            filteredCharactersAttributes.find((item) => item.id === att.id)?.value ?? 10
          "
          @change="onAttributeInput(att.id, $event.target.value)"
        />
        <span class="text-sm font-semibold text-gray-300">
          {{ att.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";

const emit = defineEmits(["update:attribute"]);

const props = defineProps({
  defaultAttributes: {
    type: Array,
    required: true,
  },
  charactersAttributes: {
    type: Array,
    required: true,
  },
});

const formatModifier = (score) => {
  if (score === undefined || score === null) return "+0";
  const modifier = Math.floor((score - 10) / 2);
  return modifier >= 0 ? `+${modifier}` : modifier.toString();
};

const filteredDefaultAttributes = computed(() => {
  return Array.isArray(props.defaultAttributes) ? props.defaultAttributes : [];
});

const filteredCharactersAttributes = computed(() => {
  return Array.isArray(props.charactersAttributes) ? props.charactersAttributes : [];
});

function onAttributeInput(id, value) {
  const updated = [...filteredDefaultAttributes.value];
  const item = updated.find((item) => item.id === id);
  if (item.id === id) {
    emit("update:attribute", {attribute_id: item.id, value: Number(value)});
  }
}
</script>
