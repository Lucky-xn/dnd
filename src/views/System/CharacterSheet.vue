<template>
  <div class="text-white p-2">
    <div v-if="character" class="grid grid-cols-12 grid-flow-row-dense gap-3">
      <!-- Character Header -->
      <div class="col-span-8 grid grid-cols-8 gap-3 items-end justify-end">
        <ImageManegement
          :is-small="true"
          :img="character.img"
          class="max-w-25 max-h-25"
        />
        <div class="col-span-2 flex flex-col gap-1">
          <span class="text-gray-400 font-semibold">Name:</span>
          <input
            v-model="character.name"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-400">Class:</span>
          <input
            v-model="character.class"
            type="text"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-400">Race:</span>
          <input
            v-model="character.race"
            type="text"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-400">Origin:</span>
          <input
            v-model="character.origin"
            type="text"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-400">Alignment:</span>
          <input
            v-model="character.alignment"
            type="text"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-400">Lv:</span>
          <input
            v-model.number="character.level"
            type="number"
            class="border border-neutral-700 px-2 py-1 text-white rounded-md bg-neutral-800 text-sm w-10"
          />
        </div>
      </div>

      <AttributeSheet :default-attributes="attributes" :characters-attributes="characterAttributes" @update:attribute="updateAttribute($event)"/>

      <div
        class="col-start-2 col-span-3 text-sm flex flex-col bg-neutral-800 border border-neutral-700 rounded-md"
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
              <input
                type="checkbox"
                class="accent-purple-600 w-2 h-2 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
              />
              <div class="flex items-center gap-1">
                <Icon
                  icon="fa-solid:dice-d20"
                  class="w-3 h-3 hover:text-gray-500 cursor-pointer transition-all duration-300"
                />
                <span>{{ skill.name }}</span>
              </div>
            </div>
            <span class="font-medium">{{
              '+0'
            }}</span>
            <!-- formatModifier(getSkillModifier(skill.ability)) -->
          </div>
        </div>
      </div>

      <div class="row-start-2 h-[20rem] col-start-5 col-span-4 grid grid-cols-4 gap-3">
        <div class="col-span-4 flex gap-3 h-25">
          <MenageStats :title="'CA'" />
          <MenageStats :title="'Max HP'" />
          <MenageStats :title="'Iniciative'" />
          <MenageStats :title="'Mov'" />
        </div>
        <div
          class="col-span-4 row-start-2 flex flex-col gap-2 bg-neutral-800 border border-neutral-700 rounded-md p-2"
        >
          <span class="font-semibold flex items-center justify-center text-xl">Hp</span>
          <div class="flex items-center justify-center h-full">
            <LifeMenagement :hp="character.hp" />
          </div>
        </div>
        <MenageStats :title="'Visão'" />
        <div
          class="col-span-3 flex flex-col items-center bg-neutral-800 border border-neutral-700 rounded-md p-2"
        >
          <span class="font-semibold text-xl">Teste de Morte</span>
          <div class="flex items-center justify-center h-full">
            <div class="flex gap-5">
              <div
                class="flex flex-col items-center gap-1 border border-neutral-700 rounded-md px-9 py-2"
              >
                <span>Falhas</span>
                <div class="flex gap-4">
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                </div>
              </div>
              x
              <div
                class="flex flex-col items-center gap-1 border border-neutral-700 rounded-md px-9 py-2"
              >
                <span>Sucesso</span>
                <div class="flex gap-4">
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                  <input
                    type="checkbox"
                    class="accent-purple-600 w-5 h-5 rounded-full appearance-none border-1 border-purple-600 checked:bg-purple-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListItems class="col-span-4 row-span-2" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import AttributeSheet from "../../components/Personagens/AttributeSheet.vue";
import ImageManegement from "../../components/ui/ImageManegement.vue";
import LifeMenagement from "../../components/ui/LifeMenagement.vue";
import ListItems from "../../components/ui/Sheet/ListItems.vue";
import MenageStats from "../../components/ui/Sheet/MenageStats.vue";

const route = useRoute();

const character = ref({});
const characterAttributes = ref([]);
const attributes = ref([]);

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


const loadCharacter = async () => {
  try {
    const result = await window.api.characterSheet.get(parseInt(route.params.id));
    character.value = result.info;
    characterAttributes.value = result.attributes;
    attributes.value = await window.api.attribute.list(character.value.system_id) || [];
  } catch (error) {
    console.error("Error loading character:", error);
  }
};

const updateAttribute = async (attribute) => {
  try {
    attribute.character_id = character.value.id;
    await window.api.characters.manipulateAttributes(attribute);
    loadCharacter();
  } catch (error) {
    console.error("Error updating attributes:", error);
  }
};

onMounted(() => {
  loadCharacter();
});
</script>
