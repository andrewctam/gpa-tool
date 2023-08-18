<script setup lang="ts">
import { compile, computed, ref } from 'vue'
import { LetterGrade } from './types';
import GradeSlider from './components/GradeSlider.vue';

const grades = ref<LetterGrade[]>([
    { letter: "A", count: 0, value: 4.0 },
    { letter: "A-", count: 0, value: 3.7 },
    { letter: "B+", count: 0, value: 3.3 },
    { letter: "B", count: 0, value: 3.0 },
    { letter: "B-", count: 0, value: 2.7 },
    { letter: "C+", count: 0, value: 2.3 },
    { letter: "C", count: 0, value: 2.0 },
    { letter: "C-", count: 0, value: 1.7 },
    { letter: "D+", count: 0, value: 1.3 },
    { letter: "D", count: 0, value: 1.0 },
    { letter: "F", count: 0, value: 0 }
])

const max = ref(120);

const updateGrade = (letter: string, count: number) => {
    count = Math.max(0, count);
    count = Math.min(max.value, count);
    
    const index = grades.value.findIndex(grade => grade.letter === letter);
    grades.value[index].count = count;
}

const gpa = computed(() => {
    const total = grades.value.reduce((acc, grade) => acc + grade.count, 0);

    if (total === 0) {
        return 0;
    }

    const weighted = grades.value.reduce((acc, grade) => acc + grade.count * grade.value, 0);
    return weighted / total;
})

</script>

<template>
    <h1>GPA Tool</h1>
    <div class="sliders">
        <GradeSlider 
            v-for="(grade) in grades" 
            :letter="grade.letter" 
            :count="grade.count"
            :max="max"
            @update="updateGrade(grade.letter, $event)" />
    </div>

    <div class="edit">
        Edit Grade Scale
    </div>

    <div>
        GPA: {{ gpa.toFixed(2) }}
    </div>

</template>

<style scoped>
h1 {
    font-size: xx-large;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    width: fit-content;
}

.sliders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin: auto;
}

.edit {
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    font-size: large;
    cursor: pointer;
    color: rgb(135, 192, 196);
}

.edit:hover {
    text-decoration: underline;
    color: rgb(135, 196, 148);

}
</style>
