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
        <span class="delete" @click="$emit('delete')">Delete</span>
    </div>

</template>

<style scoped>
.scaleEditor {
    border: 1px solid black;
    background-color: rgb(94, 92, 90);
    padding: 12px;
    margin: 8px;
    border-radius: 16px;
}

input {
    padding: 6px;
    margin: 12px 4px;
    width: 80px;
    border-radius: 8px;
    border: none;
}

.delete {
    padding: 4px;
    margin: 4px;
    color: rgb(182, 152, 152);
    cursor: pointer;
    font-size: small;
}

.delete:hover {
    color: rgb(235, 30, 30);
    text-decoration: underline;
}
</style>