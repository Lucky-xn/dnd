<template>
  <div
    class="relative w-full h-10 border border-neutral-700 rounded-md overflow-hidden"
  >
    <div
      class="bg-red-600 h-10 transition-all duration-500"
      :style="{ width: widthHp }"
    ></div>

    <span
      class="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-white"
    >
      {{ hp }} / {{ hpMax }}
    </span>

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
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  hp: {
    type: Number,
    default: 0,
  },
});

const hpMax = props.hp;
const hp = ref(props.hp);

const widthHp = computed(() => {
  return `${(hp.value / hpMax) * 100}%`;
});
</script>
