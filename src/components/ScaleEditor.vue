<script setup lang="ts">


defineProps<{
    letter: string,
    value: number
}>();

defineEmits<{
    (e: "updateLetter", str: string): void,
    (e: "updateValue", val:  number): void,
    (e: "delete"): void,
}>();
</script>

<template>

    <div class="scaleEditor">
        <input 
            :value="letter"
            @change="$emit('updateLetter', ($event.target as HTMLInputElement).value)"
            placeholder="Letter"
        />
        <input 
            type="number"
            :value="value"
            @change="$emit('updateValue', ($event.target as HTMLInputElement).valueAsNumber)"
            placeholder="Value"
        />
        <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('delete')" class="delete" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#dd6249" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    </div>

</template>

<style scoped>
.scaleEditor {
    border: 1px solid black;
    background-color: rgb(94, 92, 90);
    padding: 12px;
    margin: 8px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    padding: 6px;
    margin: 12px 4px;
    width: 80px;
    border-radius: 8px;
    border: none;
}

.delete {
    padding: 8px;
    cursor: pointer;
}
</style>