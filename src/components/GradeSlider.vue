<script setup lang="ts">
import { computed, ref } from 'vue';


const props = defineProps<{
  letter: string,
  count: number,
  max: number
}>();

defineEmits<{
  update: (count: number) => void
}>();


const creditLabel = computed(() => {
  return props.count === 1 ? `1 credit` : `${props.count} credits`;
});

const nums = [1, 2, 3, 4];
const multiplier = ref(1);

</script>

<template>
  <div class="gradeSlider">

    <div class="info">
      <span>{{ letter }}</span>
      <span>{{ creditLabel }}</span>
    </div>

    <input type="range" min="0" :max="max" :value="count" @input="$emit('update', $event.target.valueAsNumber)" />

    <div class="adder">
      <div>
        <button v-for="num in nums" @click="$emit('update', props.count + num * multiplier)" class="inc">
          {{ `+${num}` }}
        </button>
      </div>

      <div>
        <label for="mult">
          ×
        </label>
        <input id="mult" class="multipler" v-model="multiplier" type="number">
      </div>
    </div>

  </div>
</template>

<style scoped>
.gradeSlider {
  border: 1px solid black;
  background-color: rgb(94, 92, 90);
  padding: 12px;
  margin: 8px;
  border-radius: 16px;
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}


input {
  width: 100%;
}

.inc {
  padding: 4px 12px;
  margin: 2px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(94, 137, 90);
}

.multipler {
  width: 48px;
  border-radius: 4px;
  padding: 2px;
  border: none;
  background-color: rgb(180, 175, 166);
  color: black;
}

.adder {
  display: grid;
  gap: 8px;
  align-items: center;
  justify-items: center;
}

</style>
