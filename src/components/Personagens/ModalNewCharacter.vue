<template>
	<Transition name="modal">
		<div
			v-if="showModal"
			@click.self="closeAndDeleteImage"
			@keydown.esc="closeAndDeleteImage"
			class="bg-black/20 backdrop-blur-xs z-10 fixed w-full h-full inset-0"
		>
			<form
				@submit.prevent="createCharacter"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 grid-rows-6 gap-3 w-[45rem] h-[25rem] bg-neutral-900 text-white text-sm font-semibold border border-neutral-700 rounded-md p-2"
			>
				<div class="col-span-2 row-span-3 rounded-md relative group">
					<img :src="img" alt="" class="w-full h-full rounded-md object-cover transition duration-300 brightness-100 group-hover:brightness-75" />
					<div
						@click="selectImage"
						class="absolute inset-0 flex items-center cursor-pointer border-1 rounded-md border-neutral-700 border-dashed justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
					>
						<div class="flex gap-2 items-center bg-neutral-200/30 rounded-md p-1">
							<Icon icon="solar:pen-new-round-bold-duotone" class="h-5 w-5" />
							<span class="text-xs text-neutral-200">Editar Imagem</span>
						</div>
					</div>
				</div>
				<div class="col-span-4 flex items-center justify-center">
					<h2 class="text-lg font-bold">Criação de Personagem</h2>
				</div>
				
				<!-- Basic Info Row -->
				<div class="col-span-2 flex flex-col">
					<span class="text-gray-500">Nome:</span>
					<input type="text" v-model="name" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">Raça:</span>
					<input type="text" v-model="race" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">Classe:</span>
					<input type="text" v-model="characterClass" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>

				<!-- Combat Stats Row -->
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">HP:</span>
					<input type="number" v-model="hp" min="1" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">CA:</span>
					<input type="number" v-model="ca" min="1" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">Nível:</span>
					<input type="number" v-model="level" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">Origem:</span>
					<input type="text" v-model="origin" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>

				<!-- Ability Scores Row -->
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">FOR:</span>
					<input type="number" v-model="str" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">DES:</span>
					<input type="number" v-model="dex" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">CON:</span>
					<input type="number" v-model="con" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">INT:</span>
					<input type="number" v-model="int" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">SAB:</span>
					<input type="number" v-model="wis" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				<div class="col-span-1 flex flex-col">
					<span class="text-gray-500">CAR:</span>
					<input type="number" v-model="cha" min="1" max="20" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" />
				</div>
				
				<div class="flex items-center justify-center col-span-6">
					<button type="submit" class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-5 h-7 items-center cursor-pointer">Adicionar</button>
				</div>
			</form>
		</div>
	</Transition>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits(['update:close']);

const img = ref('');
const name = ref('');
const race = ref('');
const characterClass = ref('');
const origin = ref('');
const hp = ref(20);
const ca = ref(10);
const level = ref(1);

// Ability scores
const str = ref(10);
const dex = ref(10);
const con = ref(10);
const int = ref(10);
const wis = ref(10);
const cha = ref(10);

const props = defineProps({
	showModal: {
		type: Boolean,
		default: false,
	},
});

const selectImage = async () => {
	img.value = await window.api.selectImg();
};

const closeAndDeleteImage = () => {
  emit('update:close');
  deleteImage(img.value);
}

const deleteImage = async (path) => {
	try {
		console.log(await window.api.deleteImg(path));
		img.value = '';
	} catch (error) {
		console.error('Error deleting image: ', error);
	}
}

const createCharacter = () => {
	try {
		window.api.addNewCharacter({
			img: img.value,
			name: name.value,
			race: race.value,
			origin: origin.value,
			class: characterClass.value,
			hp: hp.value,
			ca: ca.value,
			level: level.value,
			str: str.value,
			dex: dex.value,
			con: con.value,
			int: int.value,
			wis: wis.value,
			cha: cha.value,
		});
		
		// Reset form
		img.value = '';
		name.value = '';
		race.value = '';
		characterClass.value = '';
		origin.value = '';
		hp.value = 20;
		ca.value = 10;
		level.value = 1;
		str.value = 10;
		dex.value = 10;
		con.value = 10;
		int.value = 10;
		wis.value = 10;
		cha.value = 10;
		
		emit('update:close');
	} catch (error) {
		console.error('Error adding character: ', error);
	}
}
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
