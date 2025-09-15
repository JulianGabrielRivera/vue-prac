<script setup lang="ts">
import {onMounted,ref} from 'vue'
import type { Dish } from '@/types';
import {v4 as uuidv4} from 'uuid'
import { useDishStore } from '@/stores/DishStore';

const props = defineProps<{
dishId?: string
}>()

const dishStore = useDishStore();
const emits = defineEmits<{
    (e:'add-new-dish', dish:Dish):void
    (e: 'cancel-edit-dish') : void
}>()
const targetDish = props.dishId ? dishStore.getDishById(props.dishId): ''

const newDish = ref<Dish>({
    id:uuidv4(),
    name: '',
    status: 'Want to Try',
})

const updateDish = () =>{
    targetDish.name = newDish.value.name
}

const elDishNameInput = ref<HTMLInputElement | null>(null)

onMounted(()=>{
    elDishNameInput.value?.focus()
})

</script>

<template>
    <form @submit.prevent>
        <div class="field">
            <div class="field">
                <label for="name" class="label">Edit Name {{ dishId }}</label>
                <div class="control">
                    <input 
                    :value="newDish.name"
                    @keyup.enter="updateDish"
                    type="text" class="input is-large"
                    placeholder="Mystery Flavored Shrimp"
                    required
                    ref="elDishNameInput"
                    />
                </div>
            </div>
            <div class="field">
                <div class="buttons">
                    <button @click="$emit('add-new-dish', newDish)" class="button is-success">Create</button>
                    <button @click="$emit('cancel-edit-dish')" cancel="button is-light">Cancel</button>
                </div>
            </div>
        </div>
    </form>
</template>


