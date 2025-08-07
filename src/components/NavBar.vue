<template>
	<div class="flex items-center justify-between px-4 h-10 border-b border-neutral-700 gap-2">
		<div class="flex items-center gap-2">
			<div class="border border-neutral-500 bg-neutral-500 r rounded-2xl w-7 h-7"></div>
			<span
				class="text-white font-semibold text-sm hover:text-purple-500 transition-all duration-300 cursor-pointer">
				<router-link to="/">
					Home
				</router-link>
			</span>
			<span
				class="text-white font-semibold text-sm hover:text-purple-500 transition-all duration-300 cursor-pointer">
				<router-link to="/Personagens">
					Personagens
				</router-link>
			</span>
			<span
				class="text-white font-semibold text-sm hover:text-purple-500 transition-all duration-300 cursor-pointer">
				<router-link to="/Campanha/Batalhas">
					Batalhas
				</router-link>
			</span>
		</div>
		<Icon icon="solar:settings-bold-duotone" class="h-7 w-7 text-white cursor-pointer"/>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>
