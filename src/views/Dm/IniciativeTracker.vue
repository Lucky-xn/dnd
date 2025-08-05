<template>
	<div class="grid grid-cols-12 gap-4 p-4 w-full h-full">

		<div class="grid grid-rows-[auto auto auto auto 1fr] gap-4 col-span-3">
			<div class="flex flex-col gap-1">
				<label class="font-semibold text-gray-600 text-xs">Nome:</label>
				<input
					class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
					placeholder="Ex: Aseir"
					v-model="nome"
					type="text"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label class="font-semibold text-gray-600 text-xs">Iniciativa:</label>
				<input
					class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
					placeholder="Ex: 21"
					v-model="iniciativa"
					type="number"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label class="font-semibold text-gray-600 text-xs">Classe de Armadura:</label>
				<input
					class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
					placeholder="Ex: 15"
					v-model="ca"
					type="number"
				/>
			</div>

			<button class="bg-blue-700 hover:bg-blue-800 cursor-pointer text-sm text-white font-semibold py-1 rounded" @click="add">Novo</button>

			<div class="flex flex-col gap-1">
				<label class="font-semibold text-gray-600 text-xs">Anotações:</label>
				<textarea
					class="border border-neutral-700 rounded-md bg-neutral-800 text-white px-2 py-1 h-100 resize-none text-sm"
					placeholder="Ex: Fazer um tpk dentro dessa Sessão."
					v-model="notas"
				></textarea>
			</div>
		</div>

		<div class="col-span-2 flex flex-col gap-3 max-h-[43rem] overflow-auto">
			<div v-for="item in filteredPersons" :key="item.iniciativa">
				<IniciativeTracker :data="item" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import IniciativeTracker from '../../components/IniciativeCard.vue';

const nome = ref('');
const iniciativa = ref(null);
const ca = ref(null);
const notas = ref('');

const persons = ref([]);

const add = () => {
	persons.value.push({
		nome: nome.value,
		iniciativa: iniciativa.value,
		ca: ca.value,
		vida: 30,
	});

	nome.value = '';
	iniciativa.value = null;
	ca.value = null;
};

const filteredPersons = computed(() => {
	return persons.value.sort((a, b) => b.iniciativa - a.iniciativa);
});

onMounted(async () => {
  await window.api.addPersonagem({ nome: 'Teste da Silva', hp: 30, raca: 'Humano', ca: 12 });
  console.log(await window.api.getPersonagens())
})
</script>
