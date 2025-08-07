<template>
	<div class="text-white w-full">
		<div class="flex items-center justify-end border-b w-full border-neutral-700 px-3 py-1 mt-7">
			<button @click="showModal = !showModal" class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-7 py-1 cursor-pointer">
				Novo Personagem
			</button>
		</div>
		<div class="w-full grid grid-cols-12 gap-4 p-3">
			<CharacterCard class="col-span-3" v-for="item in characters" :data="item" :key="item.id" />
		</div>
		<ModalNewCharacter :showModal="showModal" @update:close="closeModal" @update:newCharacter="getAllCharacters()" />
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import ModalNewCharacter from '../../components/Personagens/ModalNewCharacter.vue';
import CharacterCard from '../../components/Personagens/CharacterCard.vue';

const showModal = ref(false);
const characters = ref([]);

async function getAllCharacters() {
	try {
		characters.value = null;
		characters.value = await window.api.listAllCharacters();
	} catch (error) {
		console.error('Error fetching characters: ', error);
	}
}

const closeModal = () => {
	showModal.value = false;
};

onMounted(async () => {
	await getAllCharacters();
});
</script>
