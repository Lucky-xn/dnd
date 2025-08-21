<template>
  <Transition name="modal">
    <div
      v-if="showModal"
      @click.self="cancel = true"
      @keydown.esc="cancel = true"
      class="bg-black/20 backdrop-blur-xs z-10 fixed w-full h-full inset-0"
    >
      <form
        @submit.prevent="createCharacter"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 grid-rows-4 gap-3 w-[33rem] h-[15rem] bg-neutral-900 text-white text-sm font-semibold border border-neutral-700 rounded-md p-2"
      >
        <ImageManegement
          class="col-span-2 row-span-2"
          :cancel="cancel"
          @update:img="img = $event"
          @update:cancel="closeAndDeleteImage"
        />

        <div class="col-span-4 flex items-center justify-center">
          <h2 class="text-lg font-bold">Criação de Personagem</h2>
        </div>

        <div class="col-span-4 flex flex-col">
          <span class="text-gray-500">Name:</span>
          <input
            type="text"
            v-model="name"
            class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800"
            required
          />
        </div>
        <div class="col-span-2 flex flex-col">
          <span class="text-gray-500">Race:</span>
          <input
            type="text"
            v-model="race"
            class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800"
            required
          />
        </div>
        <div class="col-span-2 flex flex-col">
          <span class="text-gray-500">Class:</span>
          <input
            type="text"
            v-model="characterClass"
            class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800"
            required
          />
        </div>
        <div class="col-span-2 flex flex-col">
          <span class="text-gray-500">Origin:</span>
          <input
            type="text"
            v-model="origin"
            class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800"
            required
          />
        </div>

        <div class="flex items-center justify-center col-span-6">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-5 h-7 items-center cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup>
import { defineEmits, ref } from "vue";

import ImageManegement from "../../components/ui/ImageManegement.vue";

const emit = defineEmits(["update:close", "update:newCharacter"]);

const img = ref("");
const name = ref("");
const race = ref("");
const characterClass = ref("");
const origin = ref("");
const cancel = ref(false);

defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const closeAndDeleteImage = () => {
  setTimeout(() => {
    cancel.value = false;
  }, 100);
  resetForm();
  emit("update:close");
};

const resetForm = () => {
  img.value = "";
  name.value = "";
  race.value = "";
  characterClass.value = "";
  origin.value = "";
  cancel.value = false;
};

const createCharacter = async () => {
  try {
    await window.api.addNewCharacter({
      img: img.value,
      name: name.value,
      race: race.value,
      origin: origin.value,
      class: characterClass.value,
    });

    resetForm();
    emit("update:newCharacter");
    emit("update:close");
  } catch (error) {
    console.error("Error adding character: ", error);
  }
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
