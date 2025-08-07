<template>
	<Transition name="modal">
		<div
			v-if="showModal"
			@click.self="emit('updade:close')"
			@keydown.esc="emit('update:close')"
			class="bg-black/20 backdrop-blur-xs z-10 fixed w-full h-full inset-0"
		>
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 grid-rows-4 gap-3 w-[33rem] h-[15rem] bg-neutral-900 text-white text-sm font-semibold border border-neutral-700 rounded-md p-2"
			>
				<div class="col-span-2 row-span-2 rounded-md relative group">
					<img :src="image" alt="" class="w-full h-full rounded-md object-cover transition duration-300 brightness-100 group-hover:brightness-75" />
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
				<div class="col-span-4 flex items-center justify-center">Criação de Personagem</div>
				<div class="col-span-4 flex flex-col justify-end">
					<span class="text-gray-500">Name:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-2 flex flex-col">
					<span class="text-gray-500">Race:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-2 flex flex-col">
					<span class="text-gray-500">Class:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="col-span-2 flex flex-col">
					<span class="text-gray-500">Origin:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 rounded-md bg-neutral-800" required />
				</div>
				<div class="flex items-center justify-center col-span-6">
					<button class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-5 h-7 items-center cursor-pointer">Adicionar</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ref, Transition, defineEmits } from 'vue';

const image = ref('');

const emit = defineEmits('updade:close');

const props = defineProps({
	showModal: {
		type: Boolean,
		default: false,
	},
});

const selectImage = async () => {
	image.value = await window.api.selectFile();
	console.log(image);
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
