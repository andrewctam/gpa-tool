<script setup lang="ts">
import { computed, ref } from 'vue'
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

const creditsTarget = ref(120);

const creditsTotal = computed(() => {
    return grades.value.reduce((acc, grade) => acc + grade.count, 0);
})

const creditsLeft = computed(() => {
    return creditsTarget.value - creditsTotal.value;
});

const gpa = computed(() => {
    if (creditsTotal.value === 0) {
        return 0;
    }

    const weighted = grades.value.reduce((acc, grade) => acc + grade.count * grade.value, 0);
    return weighted / creditsTotal.value;
})


const updateGrade = (letter: string, count: number) => {
    const grade = grades.value.find(grade => grade.letter === letter);
    if (grade) {
        count = Math.min(creditsLeft.value + grade.count, count);
        count = Math.max(0, count);

        grade.count = count;
    }
}


</script>

<template>
    <h1>GPA Tool</h1>

    <div class="calc">
        <div class="targetInput">
            <label for="targetCredits">Target Credits:</label>
            <input id="targetCredits" v-model="creditsTarget" type="number">
        </div>

        <hr />

        <div>
            {{ `GPA: ${gpa.toFixed(2)}` }}
        </div>
        <div>
            {{ `Credits: ${creditsTotal}` }}
        </div>

    </div>

    <div class="sliders">
        <GradeSlider 
            v-for="(grade) in grades" 
            :letter="grade.letter" 
            :count="grade.count"
            :max="creditsTarget"
            @update="updateGrade(grade.letter, $event)" />
    </div>

    <div class="edit">
        Edit Grade Scale
    </div>

</template>

<style scoped>
h1 {
    font-size: xx-large;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
    width: fit-content;
}

.sliders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

.calc {
    width: 85%;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(114, 143, 168);
    border-radius: 8px;
    padding: 16px;
}

.targetInput input {
    margin-left: 4px;
    width: 40px;
    border-radius: 4px;
    padding: 2px;
    border: none;
    background-color: rgb(180, 175, 166);
    color: black;
}

</style>
