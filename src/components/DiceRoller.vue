<template>
    <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
                <Icon icon="solar:routing-2-bold-duotone" class="h-6 w-6 text-green-500 mr-3" />
                <h2 class="text-xl font-semibold text-white">Dados</h2>
            </div>
            <button 
                @click="clearHistory"
                class="text-gray-400 hover:text-gray-300 text-sm"
                title="Limpar histórico"
            >
                Limpar
            </button>
        </div>

        <!-- Standard Dice -->
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-400 mb-3">Dados Padrão</h3>
            <div class="grid grid-cols-4 gap-2">
                <button 
                    v-for="die in standardDice" 
                    :key="die"
                    @click="rollDice(die)"
                    class="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-md text-sm transition-colors font-mono"
                >
                    d{{ die }}
                </button>
            </div>
        </div>

        <!-- Custom Roll -->
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-400 mb-3">Rolagem Personalizada</h3>
            <div class="flex gap-2">
                <input
                    v-model="customRoll"
                    @keyup.enter="rollCustom"
                    placeholder="Ex: 2d6+3, 1d20+5"
                    class="flex-1 bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md text-sm"
                />
                <button
                    @click="rollCustom"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                    Rolar
                </button>
            </div>
        </div>

        <!-- Roll History -->
        <div v-if="rollHistory.length > 0">
            <h3 class="text-sm font-semibold text-gray-400 mb-3">Histórico</h3>
            <div class="max-h-48 overflow-y-auto space-y-2">
                <div 
                    v-for="(roll, index) in rollHistory.slice().reverse()" 
                    :key="index"
                    class="bg-neutral-900 border border-neutral-700 rounded-md p-3"
                >
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-400">{{ roll.expression }}</span>
                        <span class="text-lg font-bold text-green-400">{{ roll.total }}</span>
                    </div>
                    <div v-if="roll.details" class="text-xs text-gray-500 mt-1">
                        {{ roll.details }}
                    </div>
                    <div class="text-xs text-gray-600 mt-1">
                        {{ formatTime(roll.timestamp) }}
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-8 text-gray-400">
            <Icon icon="solar:routing-2-broken" class="w-12 h-12 mx-auto mb-3" />
            <p class="text-sm">Nenhuma rolagem ainda</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const standardDice = [4, 6, 8, 10, 12, 20, 100];
const customRoll = ref('');
const rollHistory = ref([]);

const rollDice = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1;
    addToHistory(`d${sides}`, result, `Rolou: ${result}`);
    return result;
};

const rollCustom = () => {
    if (!customRoll.value.trim()) return;
    
    try {
        const result = parseAndRoll(customRoll.value.trim());
        addToHistory(customRoll.value.trim(), result.total, result.details);
        customRoll.value = '';
    } catch (error) {
        console.error('Error rolling custom dice:', error);
        // You could add user feedback here
    }
};

const parseAndRoll = (expression) => {
    // Simple parser for dice notation like "2d6+3", "1d20", "d8-1"
    const regex = /(\d*)d(\d+)([+-]\d+)?/gi;
    let match;
    let total = 0;
    let details = [];
    
    while ((match = regex.exec(expression)) !== null) {
        const count = parseInt(match[1]) || 1;
        const sides = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3]) : 0;
        
        let rolls = [];
        let subtotal = 0;
        
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            subtotal += roll;
        }
        
        subtotal += modifier;
        total += subtotal;
        
        let detail = `${count}d${sides}`;
        if (count > 1) {
            detail += ` (${rolls.join(', ')})`;
        } else {
            detail += ` (${rolls[0]})`;
        }
        if (modifier !== 0) {
            detail += ` ${modifier > 0 ? '+' : ''}${modifier}`;
        }
        detail += ` = ${subtotal}`;
        
        details.push(detail);
    }
    
    return {
        total,
        details: details.join(' | ')
    };
};

const addToHistory = (expression, total, details) => {
    rollHistory.value.push({
        expression,
        total,
        details,
        timestamp: new Date()
    });
    
    // Keep only last 20 rolls
    if (rollHistory.value.length > 20) {
        rollHistory.value = rollHistory.value.slice(-20);
    }
};

const clearHistory = () => {
    rollHistory.value = [];
};

const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

// Expose rollDice function for parent components
defineExpose({
    rollDice,
    rollCustom
});
</script>