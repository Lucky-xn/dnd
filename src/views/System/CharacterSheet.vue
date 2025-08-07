<template>
	<div class="text-white p-2">
		<div v-if="character" class="grid grid-cols-12 grid-row-12 gap-3">
			<!-- Character Header -->
			<div class="col-span-8 grid grid-cols-6 gap-3 border-r text-xs">
				<div class="col-span-2 flex flex-col gap-1">
					<span class="text-gray-400 font-semibold">Name:</span>
					<input class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>
				<div class="flex flex-col gap-1">
					<span class="text-gray-400">Class:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>
				<div class="flex flex-col gap-1">
					<span class="text-gray-400">Race:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>
				<div class="row-start-2 flex flex-col gap-1">
					<span class="text-gray-400">Origin:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>
				<div class="row-start-2 flex flex-col gap-1">
					<span class="text-gray-400">Alignment:</span>
					<input type="text" class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>
				<div class="row-start-2 flex flex-col gap-1">
					<span class="text-gray-400">Lv:</span>
					<input type="number" class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm" />
				</div>

				<div class="text-right">
					<router-link to="/Personagens" class="text-blue-400 hover:text-blue-300"> ← Voltar </router-link>
				</div>
			</div>

			<div class="row-span-12 col-span-1 col-start-1 flex flex-col items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-md">
				<h2 class="text-xl font-semibold flex items-center">
					<Icon icon="solar:widget-6-bold-duotone" class="text-purple-500" />
					Atributos
				</h2>
				<div v-for="(ability, key) in abilities" :key="key" class="text-center">
					<div class="flex flex-col w-30 border border-neutral-600 rounded-md">
						<div class="text-sm text-gray-400">
							{{ formatModifier(character[key]) }}
						</div>
						<div class="text-2xl font-bold">{{ character[key] || 0 }}</div>
						<div class="text-sm font-semibold text-gray-300">{{ ability.name }}</div>
					</div>
				</div>
			</div>

			<div class="col-span-5 flex gap-3">
				<div class="bg-neutral-800 border w-30 h-30 border-neutral-700 rounded-md">
					<div class="font-semibold flex items-center">
						<Icon icon="solar:shield-bold-duotone" class="text-blue-500" />
						<span>CA</span>
					</div>
					<div class="font-bold text-center">
						{{ character.ca }}
					</div>
				</div>

				<div class="bg-neutral-800 border w-30 h-30 border-neutral-700 rounded-md">
					<div class="font-semibold flex items-center">
						<Icon icon="solar:heart-bold-duotone" class="text-red-500" />
						<span>Hp</span>
					</div>
					<div class="font-bold text-center">
						{{ character.hp }}
					</div>
				</div>

				<div class="bg-neutral-800 border w-30 h-30 border-neutral-700 rounded-md">
					<div class="font-semibold flex items-center">
						<Icon icon="solar:speed-bold-duotone" class="text-green-500" />
						<span>Iniciative</span>
					</div>
					<div class="font-bold text-center">+{{ Math.floor((character.dex || 10 - 10) / 2) }}</div>
				</div>
			</div>

			<div class="col-start-2 col-span-3 row-span-9 flex flex-col bg-neutral-800 border border-neutral-700 rounded-md p-6">
				<h2 class="text-xl font-semibold mb-4 flex items-center">
					<Icon icon="solar:book-bold-duotone" class="mr-2 text-yellow-500" />
					Perícias
				</h2>
				<div v-for="skill in skills" :key="skill.name" class="flex justify-between">
					<span class="cursor-pointer hover:text-gray-500 transition-all duration-300">{{ skill.name }}</span>
					<span class="font-medium">{{ formatModifier(getSkillModifier(skill.ability)) }}</span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-neutral-800 border border-neutral-700 rounded-md p-6">
					<h2 class="text-xl font-semibold mb-4 flex items-center">
						<Icon icon="solar:bag-4-bold-duotone" class="mr-2 text-orange-500" />
						Equipamentos
					</h2>
					<p class="text-gray-400 text-sm">Em desenvolvimento...</p>
				</div>

				<div class="bg-neutral-800 border border-neutral-700 rounded-md p-6">
					<h2 class="text-xl font-semibold mb-4 flex items-center">
						<Icon icon="solar:document-text-bold-duotone" class="mr-2 text-cyan-500" />
						Anotações
					</h2>
					<p class="text-gray-400 text-sm">Em desenvolvimento...</p>
				</div>
			</div>
		</div>

		<div v-else class="text-center py-12">
			<Icon icon="solar:user-broken" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
			<p class="text-gray-400">Personagem não encontrado</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();
const character = ref(null);

const abilities = {
	str: { name: 'FOR' },
	dex: { name: 'DES' },
	con: { name: 'CON' },
	int: { name: 'INT' },
	wis: { name: 'SAB' },
	cha: { name: 'CAR' },
};

const skills = [
	{ name: 'Acrobacia', ability: 'dex' },
	{ name: 'Arcanismo', ability: 'int' },
	{ name: 'Atletismo', ability: 'str' },
	{ name: 'Atuação', ability: 'cha' },
	{ name: 'Enganação', ability: 'cha' },
	{ name: 'Furtividade', ability: 'dex' },
	{ name: 'História', ability: 'int' },
	{ name: 'Intimidação', ability: 'cha' },
	{ name: 'Intuição', ability: 'wis' },
	{ name: 'Investigação', ability: 'int' },
	{ name: 'Lidar com Animais', ability: 'wis' },
	{ name: 'Medicina', ability: 'wis' },
	{ name: 'Natureza', ability: 'int' },
	{ name: 'Percepção', ability: 'wis' },
	{ name: 'Persuasão', ability: 'cha' },
	{ name: 'Prestidigitação', ability: 'dex' },
	{ name: 'Religião', ability: 'int' },
	{ name: 'Sobrevivência', ability: 'wis' },
];

const formatModifier = (score) => {
	if (score === undefined || score === null) return '+0';
	const modifier = Math.floor((score - 10) / 2);
	return modifier >= 0 ? `+${modifier}` : modifier.toString();
};

const getSkillModifier = (ability) => {
	return character.value ? character.value[ability] || 10 : 10;
};

const loadCharacter = async () => {
	try {
		const characters = await window.api.listAllCharacters();
		character.value = characters.find((c) => c.id == route.params.id);
	} catch (error) {
		console.error('Error loading character:', error);
	}
};

onMounted(() => {
	loadCharacter();
});
</script>
