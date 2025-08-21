<template>
  <div class="text-white p-2">
    <div v-if="character" class="grid grid-cols-12 grid-row-12 gap-3">
      <!-- Character Header -->
      <div class="col-span-6 text-xs">
        <div class="grid grid-cols-12 gap-3 items-center justify-end">
          <div class="w-16 h-16 relative group">
            <div
              v-if="!character.img"
              class="w-16 h-16 bg-white rounded-md"
            ></div>
            <img
              v-else
              :src="character.img"
              alt=""
              class="w-16 h-16 rounded-md object-cover"
            />
            <div
              @click="selectImage"
              class="absolute inset-0 flex items-center cursor-pointer border-1 rounded-md border-neutral-700 border-dashed justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                class="flex gap-2 items-center bg-neutral-200/30 rounded-md p-1"
              >
                <Icon
                  icon="solar:pen-new-round-bold-duotone"
                  class="h-5 w-5 text-gray-500"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-1 items-center gap-3">
            <div class="col-span-2 flex flex-col gap-1">
              <span class="text-gray-400 font-semibold">Name:</span>
              <input
                v-model="character.name"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
              />
            </div>
            <div class="col-span-2 flex flex-col gap-1">
              <span class="text-gray-400">Class:</span>
              <input
                v-model="character.class"
                type="text"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
              />
            </div>
            <div class="col-span-2 flex flex-col gap-1">
              <span class="text-gray-400">Race:</span>
              <input
                v-model="character.race"
                type="text"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
              />
            </div>
            <div class="col-span-2 flex flex-col gap-1">
              <span class="text-gray-400">Origin:</span>
              <input
                v-model="character.origin"
                type="text"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-1">
              <span class="text-gray-400">Alignment:</span>
              <input
                v-model="character.alignment"
                type="text"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
              />
            </div>
            <div class="col-span-1 flex flex-col gap-1">
              <span class="text-gray-400">Lv:</span>
              <input
                v-model.number="character.level"
                type="number"
                class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm w-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="row-span-11 p-3 col-span-1 col-start-1 flex flex-col items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-md"
      >
        <span class="font-semibold flex gap-2 items-center"> Atributos </span>
        <div
          v-for="(ability, key) in abilities"
          :key="key"
          class="w-full text-center"
        >
          <div class="flex flex-col border border-neutral-600 rounded-md">
            <div class="text-sm text-gray-400">
              {{ formatModifier(character[key]) }}
            </div>
            <div class="text-2xl font-bold">{{ character[key] || 0 }}</div>
            <div class="text-sm font-semibold text-gray-300">
              {{ ability.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-start-5 col-span-4 row-span-12 grid grid-cols-4 gap-3">
        <div
          class="col-span-2 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >CA</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            {{ character.ca || 0 }}
          </span>
        </div>

        <div
          class="col-span-2 flex flex-col bg-neutral-800 border border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >Max Hp</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            {{ character.hp || 0 }}
          </span>
        </div>

        <div
          class="col-span-4 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >Hp</span
          >
          <div class="flex items-center justify-center h-full">
            <LifeMenagement :hp="character.hp" />
          </div>
        </div>

        <div
          class="col-span-2 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >Iniciative</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            +{{ Math.floor((character.dex || 10 - 10) / 2) || 0 }}
          </span>
        </div>

        <div
          class="col-span-2 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >Mov</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            +{{ Math.floor((character.dex || 10 - 10) / 2) }}
          </span>
        </div>

        <div
          class="col-span-2 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >See</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            +{{ Math.floor((character.dex || 10 - 10) / 2) }}
          </span>
        </div>

        <div
          class="col-span-2 flex flex-col bg-neutral-800 border w-full h-full border-neutral-700 rounded-md p-3"
        >
          <span class="font-semibold flex items-center justify-center text-xl"
            >Exaust</span
          >
          <span
            class="flex items-center h-full justify-center font-bold text-3xl text-center"
          >
            +{{ Math.floor((character.dex || 10 - 10) / 2) }}
          </span>
        </div>
      </div>

      <div
        class="col-start-2 row-start-2 col-span-3 row-span-10 text-sm flex flex-col justify-between bg-neutral-800 border border-neutral-700 rounded-md"
      >
        <div class="flex items-center w-full border-b border-neutral-700 py-1">
          <span
            class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
            >Perícias</span
          >
          <span
            class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
            >Salvaguardas</span
          >
        </div>
        <div class="px-2">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="flex my-1 justify-between"
          >
            <div class="flex items-center gap-1">
              <Icon icon="fa-solid:dice-d20" class="w-3 h-3" />
              <span
                class="cursor-pointer hover:text-gray-500 transition-all duration-300"
                >{{ skill.name }}</span
              >
            </div>
            <span class="font-medium">{{
              formatModifier(getSkillModifier(skill.ability))
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="col-start-9 row-start-1 row-span-12 col-span-4 flex flex-col gap-6"
      >
        <div
          class="flex flex-1 flex-col bg-neutral-800 border border-neutral-700 rounded-md"
        >
          <div
            class="flex items-center w-full border-b border-neutral-700 py-1"
          >
            <span
              class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
              >Notas</span
            >
            <span
              class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
              >Equipamento</span
            >
            <span
              class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
              >Magias</span
            >
            <span
              class="flex flex-1 justify-center hover:cursor-pointer hover:text-purple-600 transition-all duration-300"
              >Inventário</span
            >
          </div>
          <p class="text-gray-400 text-sm">Em desenvolvimento...</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-400">Personagem não encontrado</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

import LifeMenagement from "../../components/ui/LifeMenagement.vue";

const route = useRoute();
const character = ref(null);

const abilities = {
  str: { name: "FOR" },
  dex: { name: "DES" },
  con: { name: "CON" },
  int: { name: "INT" },
  wis: { name: "SAB" },
  cha: { name: "CAR" },
};

const skills = [
  { name: "Acrobacia", ability: "dex" },
  { name: "Arcanismo", ability: "int" },
  { name: "Atletismo", ability: "str" },
  { name: "Atuação", ability: "cha" },
  { name: "Enganação", ability: "cha" },
  { name: "Furtividade", ability: "dex" },
  { name: "História", ability: "int" },
  { name: "Intimidação", ability: "cha" },
  { name: "Intuição", ability: "wis" },
  { name: "Investigação", ability: "int" },
  { name: "Lidar com Animais", ability: "wis" },
  { name: "Medicina", ability: "wis" },
  { name: "Natureza", ability: "int" },
  { name: "Percepção", ability: "wis" },
  { name: "Persuasão", ability: "cha" },
  { name: "Prestidigitação", ability: "dex" },
  { name: "Religião", ability: "int" },
  { name: "Sobrevivência", ability: "wis" },
];

const formatModifier = (score) => {
  if (score === undefined || score === null) return "+0";
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
    console.error("Error loading character:", error);
  }
};

onMounted(() => {
  loadCharacter();
});
</script>
