<template>
    <div class="text-white p-6 max-w-6xl mx-auto">
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-2">Dashboard D&D</h1>
            <p class="text-gray-400">Gerencie suas campanhas, personagens e batalhas</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Quick Actions -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <Icon icon="solar:user-plus-bold-duotone" class="h-8 w-8 text-purple-500 mr-3" />
                    <h2 class="text-xl font-semibold">Ações Rápidas</h2>
                </div>
                <div class="space-y-3">
                    <router-link to="/Personagens" class="block">
                        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                            Ver Personagens
                        </button>
                    </router-link>
                    <router-link to="/Campanha/Batalhas" class="block">
                        <button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                            Iniciar Batalha
                        </button>
                    </router-link>
                </div>
            </div>

            <!-- Dice Roller -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <Icon icon="solar:routing-2-bold-duotone" class="h-8 w-8 text-green-500 mr-3" />
                    <h2 class="text-xl font-semibold">Rolagem de Dados</h2>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <button 
                        v-for="die in dice" 
                        :key="die"
                        @click="rollDice(die)"
                        class="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    >
                        d{{ die }}
                    </button>
                </div>
                <div v-if="lastRoll" class="mt-4 p-3 bg-neutral-900 rounded-md">
                    <p class="text-center">
                        <span class="text-gray-400">Último resultado:</span>
                        <span class="text-green-400 font-bold text-lg ml-2">{{ lastRoll.result }}</span>
                        <span class="text-gray-500 text-sm ml-2">(d{{ lastRoll.die }})</span>
                    </p>
                </div>
            </div>

            <!-- Stats Overview -->
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <Icon icon="solar:chart-bold-duotone" class="h-8 w-8 text-yellow-500 mr-3" />
                    <h2 class="text-xl font-semibold">Resumo</h2>
                </div>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-400">Personagens:</span>
                        <span class="font-semibold">{{ characterCount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">Última sessão:</span>
                        <span class="font-semibold text-sm">{{ lastSession }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Characters -->
        <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <Icon icon="solar:users-group-rounded-bold-duotone" class="h-6 w-6 text-blue-500 mr-3" />
                    <h2 class="text-xl font-semibold">Personagens Recentes</h2>
                </div>
                <router-link to="/Personagens" class="text-purple-400 hover:text-purple-300 text-sm">
                    Ver todos →
                </router-link>
            </div>
            <div v-if="recentCharacters.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                    v-for="character in recentCharacters" 
                    :key="character.id"
                    class="bg-neutral-700 border border-neutral-600 rounded-lg p-4"
                >
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                            <Icon icon="solar:user-bold-duotone" class="h-6 w-6 text-gray-300" />
                        </div>
                        <div>
                            <h3 class="font-semibold">{{ character.name }}</h3>
                            <p class="text-sm text-gray-400">{{ character.class }} - {{ character.race }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center py-8 text-gray-400">
                <Icon icon="solar:user-plus-broken" class="h-12 w-12 mx-auto mb-3" />
                <p>Nenhum personagem criado ainda</p>
                <router-link to="/Personagens" class="text-blue-400 hover:text-blue-300">
                    Criar primeiro personagem →
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const dice = [4, 6, 8, 10, 12, 20, 100];
const lastRoll = ref(null);
const characterCount = ref(0);
const recentCharacters = ref([]);
const lastSession = ref('Nunca');

const rollDice = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1;
    lastRoll.value = { result, die: sides };
};

const loadCharacters = async () => {
    try {
        const characters = await window.api.listAllCharacters();
        characterCount.value = characters.length;
        recentCharacters.value = characters.slice(0, 3); // Show only first 3
    } catch (error) {
        console.error('Error loading characters:', error);
    }
};

onMounted(() => {
    loadCharacters();
});
</script>