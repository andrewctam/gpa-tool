<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  letter: string,
  count: number,
  max: number
}>();

defineEmits<{
  (e: "update", count: number): void
}>();


const creditLabel = computed(() => {
  return props.count === 1 ? `1 credit` : `${props.count} credits`;
});

</script>

<template>
  <div class="gradeSlider">

    <div class="info">
      <span>{{ letter }}</span>
      <span>{{ creditLabel }}</span>
    </div>

    <input class="slider" 
      type="range" 
      :min="0" 
      :max="max" 
      :value="count" 
      @input="$emit('update', ($event.target as HTMLInputElement).valueAsNumber)" 
    />

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

.slider {
  width: 100%;
}


</style>
