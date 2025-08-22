<template>
  <div class="w-full h-full rounded-md relative group">
    <img
      :src="img"
      alt=""
      class="w-full h-full rounded-md object-contain transition duration-300 brightness-100 group-hover:brightness-75"
      :class="{ 'bg-neutral-800': !img }"
    />
    <div
      @click="openImageSelector"
      class="absolute inset-0 flex items-center cursor-pointer border-1 rounded-md border-neutral-700 border-dashed justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
    >
      <div
        v-if="!isSmall && !modalIntegration"
        class="flex gap-2 items-center bg-neutral-200/30 rounded-md p-1"
      >
        <Icon icon="mdi:lead-pencil" class="h-5 w-5" />
        <span class="text-xs text-neutral-200">Editar Imagem</span>
      </div>
      <div
        v-else-if="!isSmall && modalIntegration"
        class="flex gap-2 items-center bg-neutral-200/30 rounded-md p-1"
      >
        <Icon icon="mdi:image-plus" class="h-5 w-5" />
        <span class="text-xs text-neutral-200">Selecionar Imagem</span>
      </div>
      <Icon v-else icon="mdi:lead-pencil" class="h-5 w-5" />
    </div>

    <!-- Image Selection Popup -->
    <Transition name="popup">
      <div
        v-if="showPopup"
        @click.self="closePopup"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <div
          @drop.prevent="handleDrop"
          @dragover.prevent
          @dragenter.prevent="handleDragEnter"
          @dragleave="handleDragLeave"
          class="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-96 h-64 flex flex-col items-center justify-center gap-4 relative"
          :class="{ 'border-blue-500 bg-neutral-800': isDragging }"
        >
          <button
            @click="closePopup"
            class="absolute top-2 right-2 text-neutral-400 hover:text-white transition-colors"
          >
            <Icon icon="mdi:close" class="h-5 w-5" />
          </button>

          <div class="text-center">
            <Icon icon="mdi:cloud-upload" class="h-12 w-12 text-neutral-400 mx-auto mb-2" />
            <p class="text-white font-medium mb-1">Arraste uma imagem aqui</p>
            <p class="text-neutral-400 text-sm">ou</p>
          </div>

          <button
            @click="selectImageFile"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Selecionar Arquivo
          </button>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />
        </div>
      </div>
    </Transition>
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
  modalIntegration: {
    type: Boolean,
    default: false,
  },
});

const img = ref(props.img);
const showPopup = ref(false);
const isDragging = ref(false);
const fileInput = ref(null);

const openImageSelector = () => {
  if (props.modalIntegration) {
    showPopup.value = true;
  } else {
    selectImage();
  }
};

const closePopup = () => {
  showPopup.value = false;
  isDragging.value = false;
};

const selectImage = async () => {
  img.value = await window.api.images.select();
  emit("update:img", img.value);
};

const selectImageFile = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await processImageFile(file);
  }
};

const handleDrop = async (event) => {
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      await processImageFile(file);
    }
  }
};

const processImageFile = async (file) => {
  try {
    // Create a file path or use the existing window.api method
    // For now, we'll use the existing API which might handle file objects
    if (window.api.images.processFile) {
      img.value = await window.api.images.processFile(file);
    } else {
      // Fallback: create object URL for preview (temporary solution)
      img.value = URL.createObjectURL(file);
    }
    emit("update:img", img.value);
    closePopup();
  } catch (error) {
    console.error("Error processing image file:", error);
  }
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

// Handle drag events
const handleDragEnter = () => {
  isDragging.value = true;
};

const handleDragLeave = (event) => {
  // Only set to false if we're leaving the drop zone completely
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragging.value = false;
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

<style>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-in-out;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .bg-neutral-900,
.popup-leave-to .bg-neutral-900 {
  transform: scale(0.9);
}
</style>
