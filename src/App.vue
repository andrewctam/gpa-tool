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


const updateGradeCount = (index: number, count: number) => {
    const grade = grades.value[index];
    if (grade) {
        count = Math.min(creditsLeft.value + grade.count, count);
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

    <div v-if="showScaleEditor" class="scaleEditor">
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
            Add New
        </div>
        
    </div>
    <div v-else class="sliders">
        <GradeSlider
            v-for="(grade, index) in grades" 
            :letter="grade.letter" 
            :count="grade.count"
            :max="creditsTarget"
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

.scaleEditor {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.addNew {
    text-align: center;
    cursor: pointer;
    color: rgb(161, 196, 135);
    margin-top: 8px;
    margin-bottom: 40px;
}

.addNew:hover {
    text-decoration: underline;
    color: rgb(135, 196, 148);
}
</style>
