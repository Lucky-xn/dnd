<template>
  <Transition name="modal">
    <div
      v-if="showModal"
      @click.self="cancel = true"
      @keydown.esc="cancel = true"
      class="bg-black/20 backdrop-blur-xs z-10 fixed w-full h-full inset-0"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[50rem] h-[25rem] bg-neutral-900 text-white text-sm font-semibold border border-neutral-700 rounded-md"
      >
        <!-- Header with title and step indicator -->
        <div class="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
          <span class="text-lg font-bold">Criação de Personagem</span>
          <div class="flex items-center gap-2">
            <div 
              v-for="step in 3" 
              :key="step"
              class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="step <= currentStep ? 'bg-blue-500' : 'bg-neutral-600'"
            ></div>
          </div>
        </div>

        <!-- Step content with slide animation -->
        <div class="flex-1 relative overflow-hidden">
          <Transition 
            :name="slideDirection" 
            mode="out-in"
            @before-enter="isAnimating = true"
            @after-enter="isAnimating = false"
          >
            <div :key="currentStep" class="absolute inset-0 p-4">
              <Step1Core 
                v-if="currentStep === 1"
                :formData="formData"
                :systems="systems"
                @update:systemSelected="formData.systemSelected = $event"
                @update:name="formData.name = $event"
                @update:level="formData.level = $event"
              />
              <Step2Image 
                v-else-if="currentStep === 2"
                :cancel="cancel"
                @update:img="formData.img = $event"
                @update:cancel="closeAndDeleteImage"
              />
              <Step3Additional 
                v-else-if="currentStep === 3"
                :formData="formData"
                @update:race="formData.race = $event"
                @update:characterClass="formData.characterClass = $event"
                @update:origin="formData.origin = $event"
                @update:alignment="formData.alignment = $event"
              />
            </div>
          </Transition>
        </div>

        <!-- Navigation buttons -->
        <div class="flex items-center justify-between border-t border-neutral-700 px-4 py-3">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            :disabled="isAnimating"
            class="bg-neutral-700 hover:bg-neutral-600 transition-all duration-300 rounded-md px-5 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Voltar
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 3"
            @click="nextStep"
            :disabled="isAnimating || !isCurrentStepValid"
            class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-5 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
          <button
            v-else
            @click="createCharacter"
            :disabled="isAnimating || !isCurrentStepValid"
            class="bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-md px-5 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Personagem
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineEmits, onMounted, ref, computed, watch } from "vue";

import Step1Core from "./Steps/Step1Core.vue";
import Step2Image from "./Steps/Step2Image.vue";
import Step3Additional from "./Steps/Step3Additional.vue";

const emit = defineEmits(["update:close", "update:newCharacter"]);

const systems = ref([]);
const cancel = ref(false);
const currentStep = ref(1);
const slideDirection = ref('slide-left');
const isAnimating = ref(false);

// Centralized form data
const formData = ref({
  systemSelected: "",
  img: "",
  name: "",
  race: "",
  origin: "",
  alignment: "",
  level: 1,
  characterClass: "",
});

defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

// Step validation logic
const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.systemSelected && 
             formData.value.name && 
             formData.value.level > 0;
    case 2:
      return true; // Image is optional
    case 3:
      return formData.value.race && 
             formData.value.characterClass && 
             formData.value.origin && 
             formData.value.alignment;
    default:
      return false;
  }
});

// Navigation functions
const nextStep = () => {
  if (currentStep.value < 3 && isCurrentStepValid.value && !isAnimating.value) {
    slideDirection.value = 'slide-left';
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1 && !isAnimating.value) {
    slideDirection.value = 'slide-right';
    currentStep.value--;
  }
};

const closeAndDeleteImage = () => {
  setTimeout(() => {
    cancel.value = false;
  }, 100);
  resetForm();
  emit("update:close");
};

const resetForm = () => {
  formData.value = {
    systemSelected: "",
    img: "",
    name: "",
    race: "",
    origin: "",
    alignment: "",
    level: 1,
    characterClass: "",
  };
  currentStep.value = 1;
  cancel.value = false;
};

const createCharacter = async () => {
  if (!isCurrentStepValid.value) return;
  
  try {
    await window.api.characters.create({
      img: formData.value.img,
      name: formData.value.name,
      race: formData.value.race,
      origin: formData.value.origin,
      class: formData.value.characterClass,
      system: formData.value.systemSelected,
      level: formData.value.level,
      alignment: formData.value.alignment,
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
    // Add default systems for testing when API is not available
    systems.value = [
      { id: 1, name: "D&D 5E" },
      { id: 2, name: "Pathfinder" },
      { id: 3, name: "Call of Cthulhu" }
    ];
  }
}

// Reset form when modal closes
watch(() => formData.value.showModal, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

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

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
