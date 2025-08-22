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
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-[50rem] h-[20rem] bg-neutral-900 text-white text-sm font-semibold border border-neutral-700 rounded-md"
      >
        <span class="flex items-center justify-center border-b border-neutral-700 text-lg py-2 font-bold">Criação de Personagem</span>

        <div class="flex items-end gap-2 h-full px-2">
          <ImageManegement
            class="flex-1"
            :cancel="cancel"
            @update:img="img = $event"
            @update:cancel="closeAndDeleteImage"
          />
  
          <div class="flex flex-col justify-between h-full flex-1/2 gap-2">
          <div class="flex flex-col">
            <span class="text-gray-500">System:</span>
            <select v-model="systemSelected" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" placeholder="ex:. D&D 5E" required>
              <option v-for="sys in systems" :key="sys.id" :value="sys.name">{{ sys.name }}</option>
            </select>
          </div>
            <div class="flex gap-2">
              <div class="flex flex-1 flex-col">
                <span class="text-gray-500">Name:</span>
                <input
                  type="text"
                  placeholder="ex:. Asylan"
                  v-model="name"
                  class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
                  required
                />
              </div>
              <div class="flex flex-col w-15">
                <span class="text-gray-500">Lv:</span>
                <input
                  type="number"
                  v-model="level"
                  class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 px-2">
          <div class="flex flex-1 flex-col">
            <span class="text-gray-500">Race:</span>
            <input
              type="text"
              placeholder="ex:. Human"
              v-model="race"
              class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
              required
            />
          </div>
          <div class="flex flex-1 flex-col">
            <span class="text-gray-500">Class:</span>
            <input
              type="text"
              placeholder="ex:. Bard"
              v-model="characterClass"
              class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
              required
            />
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">Origin:</span>
            <input
              type="text"
              placeholder="ex:. Hero"
              v-model="origin"
              class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
              required
            />
          </div>
        <div class=" flex flex-col">
          <span class="text-gray-500">Alignment:</span>
          <input
            type="text"
            v-model="alignment"
            placeholder="ex:. Chaotic Good"
            class="border border-neutral-700 placeholder:font-normal px-2 py-1 rounded-md bg-neutral-800"
            required
          />
        </div>
        </div>

        <div class="flex items-center justify-center pb-2">
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
import { defineEmits, onMounted, ref } from "vue";

import ImageManegement from "../../components/ui/ImageManegement.vue";

const emit = defineEmits(["update:close", "update:newCharacter"]);

const systems = ref([]);
const systemSelected = ref("");
const img = ref("");
const name = ref("");
const race = ref("");
const origin = ref("");
const alignment = ref("");
const level = ref(1);
const characterClass = ref("");
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
    await window.api.characters.create({
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

const getData = async () => {
  try {
    systems.value = await window.api.system.list();
    console.log("Systems fetched: ", systems.value);
  } catch (error) {
    console.error("Error fetching systems: ", error);
  }
}

onMounted(() => {
  getData();
});
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
