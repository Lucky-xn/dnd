<template>
	<div class="grid grid-cols-12 gap-4 p-4 w-full h-full">
		<div class="flex flex-col gap-3 col-span-3">
			<form @submit.prevent="add" class="flex flex-col gap-3">
				<div class="flex flex-col gap-1">
					<label class="font-semibold text-gray-600 text-xs">Name:</label>
					<input
						class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
						placeholder="Ex: Aseir"
						required
						v-model="name"
						type="text"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label class="font-semibold text-gray-600 text-xs">Iniciative:</label>
					<div class="flex gap-2">
						<input
							class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm flex-1"
							placeholder="Ex: 21"
							required
							v-model="iniciative"
							min="1"
							type="number"
						/>
						<button 
							type="button" 
							@click="rollInitiative"
							class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs transition-colors"
							title="Rolar d20"
						>
							d20
						</button>
					</div>
				</div>

				<div class="flex gap-3 min-w-0">
					<div class="flex flex-col gap-1 w-full">
						<label class="font-semibold text-gray-600 text-xs">CA:</label>
						<input
							class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm w-full"
							placeholder="Ex: 15"
							required
							v-model="ca"
							min="1"
							type="number"
						/>
					</div>

					<div class="flex flex-col gap-1 w-full">
						<label class="font-semibold text-gray-600 text-xs">Hp:</label>
						<input
							class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm w-full"
							placeholder="Ex: 17"
							required
							v-model="hp"
							min="1"
							type="number"
						/>
					</div>
				</div>

				<button type="submit" class="bg-blue-700 hover:bg-blue-800 cursor-pointer text-sm text-white font-semibold py-1 rounded">New</button>
			</form>

			<div class="flex flex-col gap-1">
				<label class="font-semibold text-gray-600 text-xs">Notes:</label>
				<textarea
					class="border border-neutral-700 rounded-md bg-neutral-800 text-white px-2 py-1 h-20 resize-none text-sm"
					placeholder="Ex: Fazer um tpk dentro dessa Sessão."
					v-model="notes"
				></textarea>
			</div>
		</div>

		<div class="col-start-4 col-span-3 flex flex-col gap-3 max-h-[43rem] overflow-auto">
			<div class="flex items-center justify-between">
				<h2 class="text-white font-semibold">Ordem de Iniciativa</h2>
				<button 
					@click="clearBattle"
					class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
				>
					Limpar Batalha
				</button>
			</div>
			<div v-for="item in filteredPersons" :key="item.iniciative">
				<IniciativeCard :data="item" />
			</div>
		</div>

		<div class="col-start-7 col-span-3 border-l font-semibold border-neutral-700">
			<div class="ml-2 flex flex-col gap-3">
				<span class="text-white">Characters</span>
				<div
					v-for="item in allCharacters"
					:key="item.name"
					class="flex items-center justify-between gap-2 text-white text-sm bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1"
				>
					<div class="flex items-center gap-2">
						<div class="flex items-center gap-0.5">
							<span class="text-xs text-gray-500">Name:</span>
							<span>{{ item.name }}</span>
						</div>
						<div class="flex items-center gap-0.5">
							<span class="text-xs items-center text-gray-500">CA:</span>
							<span>{{ item.ca }}</span>
						</div>
					</div>
					<button 
						@click="addCharacterToBattle(item)"
						class="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md px-4 h-6"
					>
						Add
					</button>
				</div>
			</div>
		</div>

		<div class="col-start-10 col-span-3">
			<DiceRoller ref="diceRoller" />
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import IniciativeCard from '../../components/IniciativeCard.vue';
import DiceRoller from '../../components/DiceRoller.vue';

const name = ref('');
const iniciative = ref(null);
const ca = ref(null);
const hp = ref(null);
const notes = ref('');

const persons = ref([]);
const allCharacters = ref([]);
const diceRoller = ref(null);

const add = () => {
	persons.value.push({
		name: name.value,
		iniciative: iniciative.value,
		ca: ca.value,
		hp: hp.value,
	});

	name.value = '';
	iniciative.value = null;
	ca.value = null;
	hp.value = null;
};

const addCharacterToBattle = (character) => {
	const initiative = Math.floor(Math.random() * 20) + 1; // Random initiative for now
	persons.value.push({
		name: character.name,
		iniciative: initiative,
		ca: character.ca || 10, // Use character's CA or default to 10
		hp: character.hp || 20,  // Use character's HP or default to 20
	});
};

const rollInitiative = () => {
	if (diceRoller.value) {
		const result = diceRoller.value.rollDice(20);
		iniciative.value = result;
	}
};

const clearBattle = () => {
	persons.value = [];
};

const filteredPersons = computed(() => {
	return persons.value.sort((a, b) => b.iniciative - a.iniciative);
});

const loadCharacters = async () => {
	allCharacters.value = await window.api.listAllCharacters();
};

onMounted(async () => {
	await loadCharacters();
});
</script>
