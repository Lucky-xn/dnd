<template>
	<div class="flex gap-3 w-[25rem] items-end justify-between shadow-2xl font-semibold rounded-md bg-neutral-800">
		<div class="flex gap-3 items-center">
			<div v-if="!data.img" class="relative bg-white rounded-l-md w-30 h-30">
				<Icon icon="solar:user-bold-duotone" class="absolute w-30 h-30 text-black" />
			</div>
			<div v-else class="rounded-l-md w-24 h-24 overflow-hidden justify-center">
				<img :src="data.img" alt="" class="w-full h-full object-cover" />
			</div>
			<div class="flex flex-col h-[100%] justify-center gap-4">
				<div class="flex flex-col">
					<span class="text-xl cursor-pointer">{{ data.name }}</span>
					<span class="text-sm">{{ data.class }} - {{ data.race }}</span>
				</div>
				<div class="text-xs text-gray-500">Data: {{ data.created_at }}</div>
			</div>
		</div>
		<button class="bg-blue-600 hover:bg-blue-600 cursor-pointer text-sm px-7 h-6 rounded-md mb-3 mr-3">Sheet</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
	data: {
		type: Object,
		default: () => {},
	},
});

// TODO: colocar um atributto on click para jogar para a pargina de personagem
</script>
