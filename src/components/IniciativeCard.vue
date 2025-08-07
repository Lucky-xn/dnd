<template>
	<div class="border rounded-md border-neutral-700 bg-neutral-900 p-2">
		<div class="flex gap-2">
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">Name:</label>
				<span class="text-sm text-white font-medium">{{ data.name }}</span>
			</div>
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">Iniciativa:</label>
				<span class="text-sm text-white font-medium">{{ data.iniciative }}</span>
			</div>
			<div class="flex flex-col gap-0.1 px-2 py-1">
				<label class="text-xs font-semibold text-gray-500">CA:</label>
				<span class="text-sm text-white font-medium">{{ data.ca }}</span>
			</div>
		</div>

		<div class="relative w-full h-10 border border-neutral-700 rounded-md overflow-hidden">
			<div class="bg-red-600 h-10 transition-all duration-500" :style="{ width: widthHp }"></div>

			<span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-white"> {{ hp }} / {{ hpMax }} </span>

			<Icon
				icon="solar:alt-arrow-left-line-duotone"
				class="absolute bottom-2 left-2 cursor-pointer h-5 w-5 text-white"
				@click="hp = Math.max(0, hp - 1)"
			/>
			<Icon
				icon="solar:double-alt-arrow-left-outline"
				class="absolute bottom-2 left-8 cursor-pointer h-5 w-5 text-white"
				@click="hp = Math.max(0, hp - 5)"
			/>
			<Icon
				icon="solar:alt-arrow-right-outline"
				class="absolute bottom-2 right-8 cursor-pointer h-5 w-5 text-white"
				@click="hp = Math.min(hpMax, hp + 1)"
			/>
			<Icon
				icon="solar:double-alt-arrow-right-outline"
				class="absolute bottom-2 right-2 cursor-pointer h-5 w-5 text-white"
				@click="hp = Math.min(hpMax, hp + 5)"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const hpMax = props.data.hp;
const hp = ref(hpMax);

const widthHp = computed(() => {
	return `${Math.min((hp.value / hpMax) * 100, 100)}%`;
});
</script>
