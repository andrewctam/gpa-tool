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
        />
        <input 
            type="number"
            :value="value"
            @change="$emit('updateValue', ($event.target as HTMLInputElement).valueAsNumber)"
        />
        <span class="delete" @click="$emit('delete')">Delete</span>
    </div>

</template>

<style scoped>
.scaleEditor {
    padding: 2px;
    background-color: rgb(135, 137, 137);
    border-radius: 4px;
    margin: 4px;
    
}

input {
    padding: 6px;
    margin: 12px 4px;
    width: 80px;
}

.delete {
    padding: 4px;
    margin: 4px;
    color: rgb(53, 50, 50);
    cursor: pointer;
    font-size: small;
}

.delete:hover {
    color: rgb(235, 30, 30);
    text-decoration: underline;
}
</style>