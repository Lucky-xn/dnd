<template>
	<div class="border rounded-md border-neutral-700 bg-neutral-900 p-2">
		<div class="flex gap-2">
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">Nome:</label>
				<span class="text-sm text-white font-medium">{{ data.nome }}</span>
			</div>
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">Iniciativa:</label>
				<span class="text-sm text-white font-medium">{{ data.iniciativa }}</span>
			</div>
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">CA:</label>
				<span class="text-sm text-white font-medium">{{ data.ca }}</span>
			</div>
		</div>

		<div class="relative w-full h-10 border border-neutral-700 rounded-md overflow-hidden">
			<div class="bg-red-600 h-10 transition-all duration-500" :style="{ width: larguraVida }"></div>

			<span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-white"> {{ vida }} / {{ vidaMax }} </span>

			<Icon
				icon="solar:alt-arrow-left-line-duotone"
				class="absolute bottom-2 left-2 cursor-pointer h-5 w-5 text-white"
				@click="vida = Math.max(0, vida - 1)"
			/>
			<Icon
				icon="solar:double-alt-arrow-left-outline"
				class="absolute bottom-2 left-8 cursor-pointer h-5 w-5 text-white"
				@click="vida = Math.max(0, vida - 5)"
			/>
			<Icon
				icon="solar:alt-arrow-right-outline"
				class="absolute bottom-2 right-8 cursor-pointer h-5 w-5 text-white"
				@click="vida = Math.min(vidaMax, vida + 1)"
			/>
			<Icon
				icon="solar:double-alt-arrow-right-outline"
				class="absolute bottom-2 right-2 cursor-pointer h-5 w-5 text-white"
				@click="vida = Math.min(vidaMax, vida + 5)"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const vidaMax = props.data.vida;
const vida = ref(vidaMax);

const larguraVida = computed(() => {
	return `${Math.min((vida.value / vidaMax) * 100, 100)}%`;
});
</script>
