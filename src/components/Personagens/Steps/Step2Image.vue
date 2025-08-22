<template>
  <div class="flex flex-col gap-4 h-full justify-center items-center">
    <span class="text-gray-400 text-lg mb-4">Seleção de Imagem</span>
    <ImageManegement
      class="w-64 h-64"
      :img="img"
      :cancel="cancel"
      :modalIntegration="true"
      @update:img="handleImageUpdate"
      @update:cancel="$emit('update:cancel')"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ImageManegement from "../../ui/ImageManegement.vue";

const emit = defineEmits(["update:img", "update:cancel"]);

const props = defineProps({
  img: {
    type: String,
    default: "",
  },
  cancel: {
    type: Boolean,
    default: false,
  },
});

const img = ref(props.img);

const handleImageUpdate = (newImg) => {
  img.value = newImg;
  emit('update:img', newImg);
};

// Watch for prop changes to keep local state in sync
watch(
  () => props.img,
  (newValue) => {
    img.value = newValue;
  }
);
</script>