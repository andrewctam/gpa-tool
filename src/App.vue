<script setup lang="ts">
import { computed, ref } from 'vue'
import { LetterGrade } from './types';
import GradeSlider from './components/GradeSlider.vue';
import ScaleEditor from "./components/ScaleEditor.vue"

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

const showScaleEditor = ref(false);

const currentGPA = ref(0);
const currentCredits = ref(0);
const targetCredits = ref(120);

const creditsTotal = computed(() => {
    return grades.value.reduce((acc, grade) => acc + grade.count, 0);
})

const gpa = computed(() => {
    const creditsSum = currentCredits.value + creditsTotal.value;
    if (creditsSum === 0) {
        return 0;
    }

    const weighted = grades.value.reduce((acc, grade) => acc + grade.count * grade.value, 0);
    return (weighted + currentGPA.value * currentCredits.value) / creditsSum;
})


const updateGradeCount = (index: number, count: number) => {
    const creditsLeft = targetCredits.value - creditsTotal.value - currentCredits.value;

    const grade = grades.value[index];
    if (grade) {
        count = Math.min(creditsLeft + grade.count, count);
        count = Math.max(0, count);

        grade.count = count;
    }
}

const updateGradeLetter = (index: number, newLetter: string) => {
    if (grades.value.find(grade => grade.letter === newLetter)) {
        return;
    }
    
    const grade = grades.value[index];
    if (grade) {
        grade.letter = newLetter;
    }
}

const updateGradeValue = (index: number, value: number) => {
    const grade = grades.value[index];
    if (grade) {
        grade.value = value;
    }
}
</script>

<template>
    <h1>GPA Tool</h1>

    <div class="calc">
        <div>
            <div class="targetInput">
                <label for="targetCredits">Current GPA:</label>
                <input id="targetCredits" v-model="currentGPA" type="number">
            </div>
            <div class="targetInput">
                <label for="targetCredits">Current Credits:</label>
                <input id="targetCredits" v-model="currentCredits" type="number">
            </div>
            <div class="targetInput">
                <label for="targetCredits">Target Credits:</label>
                <input id="targetCredits" v-model="targetCredits" type="number">
            </div>
        </div>

        <div class="stats">
            <div>
                {{ `GPA: ${gpa.toFixed(2)}` }}
            </div>
            <div>
                {{ `Credits: ${creditsTotal + currentCredits}` }}
            </div>
        </div>
    </div>

    <div v-if="showScaleEditor" class="gridLayout">
        <ScaleEditor 
            v-for="(grade, index) in grades"
            :letter="grade.letter"
            :value="grade.value"
            @update-letter="updateGradeLetter(index, $event)"
            @update-value="updateGradeValue(index, $event)"
            @delete="grades.splice(index, 1)"
        />

        <div
            class="addNew"
            @click="grades.push({ letter: '', count: 0, value: 0 })">
            
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7bc62d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l6 0" />
                <path d="M12 9l0 6" />
            </svg>
        </div>
        
    </div>
    <div v-else class="gridLayout">
        <GradeSlider
            v-for="(grade, index) in grades" 
            :letter="grade.letter" 
            :count="grade.count"
            :max="targetCredits - currentCredits"
            @update="updateGradeCount(index, $event)" 
        />
    </div>

    <div class="edit" @click="showScaleEditor = !showScaleEditor">
        {{ showScaleEditor ? "Close" : "Edit Grade Scale" }}
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

.gridLayout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    margin: auto;
}

.edit {
    margin: 32px auto;
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
    width: 50%;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(60, 65, 68);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
}

@media only screen and (max-width: 600px) {
    .calc {
        width: 90%;
    }
}

.stats {
    text-align: right;
    font-size: large;
}

.targetInput {
    display: flex;
    align-items: center;
    font-size: large;
}

.targetInput input {
    margin: 6px;
    width: 60px;
    border-radius: 4px;
    padding: 4px;
    border: none;
    background-color: rgb(180, 175, 166);
    color: black;
    font-size: medium;
}

.addNew {
    display: grid;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    margin: 8px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 16px;
}

.addNew:hover {
    text-decoration: underline;
    color: rgb(135, 196, 148);
}
</style>
