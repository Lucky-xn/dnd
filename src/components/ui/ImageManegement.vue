<template>
  <div class="w-full h-full rounded-md relative group">
    <img
      :src="img"
      alt=""
      class="w-full h-full rounded-md object-cover transition duration-300 brightness-100 group-hover:brightness-75"
    />
    <div
      @click="selectImage"
      class="absolute inset-0 flex items-center cursor-pointer border-1 rounded-md border-neutral-700 border-dashed justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
    >
      <div
        v-if="!isSmall"
        class="flex gap-2 items-center bg-neutral-200/30 rounded-md p-1"
      >
        <Icon icon="mdi:lead-pencil" class="h-5 w-5" />
        <span class="text-xs text-neutral-200">Editar Imagem</span>
      </div>
      <Icon v-else icon="mdi:lead-pencil" class="h-5 w-5" />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, watch } from "vue";

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
  isSmall: {
    type: Boolean,
    default: false,
  },
});

const img = ref(props.img);

const selectImage = async () => {
  img.value = await window.api.images.select();
  emit("update:img", img.value);
};

const deleteImage = async (path) => {
  try {
    await window.api.images.delete(path);
    img.value = "";
    emit("update:cancel");
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};

watch(
  () => props.cancel,
  async (newValue, oldValue) => {
    if (newValue && !oldValue) {
      await deleteImage(img.value);
    }
  }
);

watch(
  () => props.img,
  (newValue) => {
    img.value = newValue;
  }
);
</script>
