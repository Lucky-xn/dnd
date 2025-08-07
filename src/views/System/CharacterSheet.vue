<template>
    <div class="text-white p-6 max-w-6xl mx-auto">
        <div v-if="character" class="space-y-6">
            <!-- Character Header -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <div class="flex items-center space-x-6">
                    <div class="w-32 h-32 bg-neutral-700 rounded-lg overflow-hidden">
                        <img 
                            v-if="character.img" 
                            :src="character.img" 
                            :alt="character.name"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <Icon icon="solar:user-bold-duotone" class="w-16 h-16 text-gray-400" />
                        </div>
                    </div>
                    
                    <div class="flex-1">
                        <h1 class="text-3xl font-bold mb-2">{{ character.name }}</h1>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span class="text-gray-400">Classe:</span>
                                <span class="ml-2 font-semibold">{{ character.class || 'Não definida' }}</span>
                            </div>
                            <div>
                                <span class="text-gray-400">Raça:</span>
                                <span class="ml-2 font-semibold">{{ character.race || 'Não definida' }}</span>
                            </div>
                            <div>
                                <span class="text-gray-400">Origem:</span>
                                <span class="ml-2 font-semibold">{{ character.origin || 'Não definida' }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-right">
                        <router-link to="/Personagens" class="text-blue-400 hover:text-blue-300">
                            ← Voltar
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Combat Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center">
                        <Icon icon="solar:shield-bold-duotone" class="mr-2 text-blue-500" />
                        Classe de Armadura
                    </h2>
                    <div class="text-3xl font-bold text-center">
                        {{ character.ca || 10 }}
                    </div>
                </div>

                <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center">
                        <Icon icon="solar:heart-bold-duotone" class="mr-2 text-red-500" />
                        Pontos de Vida
                    </h2>
                    <div class="text-3xl font-bold text-center">
                        {{ character.hp || 20 }}
                    </div>
                </div>

                <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center">
                        <Icon icon="solar:speed-bold-duotone" class="mr-2 text-green-500" />
                        Modificador de Iniciativa
                    </h2>
                    <div class="text-3xl font-bold text-center">
                        +{{ Math.floor((character.dex || 10 - 10) / 2) }}
                    </div>
                </div>
            </div>

            <!-- Ability Scores -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                    <Icon icon="solar:widget-6-bold-duotone" class="mr-2 text-purple-500" />
                    Atributos
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div v-for="(ability, key) in abilities" :key="key" class="text-center">
                        <div class="bg-neutral-700 border border-neutral-600 rounded-lg p-4">
                            <div class="text-sm font-semibold text-gray-300 mb-2">{{ ability.name }}</div>
                            <div class="text-2xl font-bold mb-1">{{ character[key] || 10 }}</div>
                            <div class="text-sm text-gray-400">
                                {{ formatModifier(character[key] || 10) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skills Section -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                    <Icon icon="solar:book-bold-duotone" class="mr-2 text-yellow-500" />
                    Perícias
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div v-for="skill in skills" :key="skill.name" class="flex justify-between">
                        <span>{{ skill.name }}</span>
                        <span class="font-mono">{{ formatModifier(getSkillModifier(skill.ability)) }}</span>
                    </div>
                </div>
            </div>

            <!-- Equipment & Notes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center">
                        <Icon icon="solar:bag-4-bold-duotone" class="mr-2 text-orange-500" />
                        Equipamentos
                    </h2>
                    <p class="text-gray-400 text-sm">Em desenvolvimento...</p>
                </div>

                <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
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
    cha: { name: 'CAR' }
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
    { name: 'Sobrevivência', ability: 'wis' }
];

const formatModifier = (score) => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
};

const getSkillModifier = (ability) => {
    return character.value ? character.value[ability] || 10 : 10;
};

const loadCharacter = async () => {
    try {
        const characters = await window.api.listAllCharacters();
        character.value = characters.find(c => c.id == route.params.id);
    } catch (error) {
        console.error('Error loading character:', error);
    }
};

onMounted(() => {
    loadCharacter();
});
</script>