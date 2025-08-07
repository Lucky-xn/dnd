<template>
    <div class="text-white w-full">
        <div class="flex items-center justify-end border-b w-full border-neutral-700 px-3 py-1 mt-7">
            <button
                @click="showModal = !showModal"
                class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-7 py-1 cursor-pointer">Novo
                Personagem</button>
        </div>
        <div class="w-full p-3">
        <ModalNewCharacter :showModal="showModal" @updade:close="showModal = false" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ModalNewCharacter from '../../components/Personagens/ModalNewCharacter.vue';

const showModal = ref(false)
</script>