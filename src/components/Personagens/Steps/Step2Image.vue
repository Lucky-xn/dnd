<template>
  <div class="flex flex-col gap-4 h-full justify-center items-center">
    <span class="text-gray-400 text-lg mb-4">Seleção de Imagem</span>
    <ImageManegement
      class="w-64 h-64"
      :cancel="cancel"
      @update:img="$emit('update:img', $event)"
      @update:cancel="$emit('update:cancel')"
    />
  </div>
</template>

<script setup>
import ImageManegement from "../../ui/ImageManegement.vue";

defineEmits(["update:img", "update:cancel"]);

defineProps({
  cancel: {
    type: Boolean,
    default: false,
  },
});
</script>