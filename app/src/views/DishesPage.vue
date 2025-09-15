<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import EditDishForm from '@/components/EditDishForm.vue'
import type { Dish } from '@/types'
import { useDishStore } from '@/stores/DishStore'

type ShowFormState = '' | 'new' | 'edit'

const filterText = ref('')
const showForm = ref<ShowFormState>('')
const dishStore = useDishStore()
const dishList = dishStore.list

const filteredDishList = computed((): Dish[] => {
  return dishList.filter((dish: Dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
})
const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}
const editDishId = ref('')

const updateFilterText = (event:KeyboardEvent) =>{

  filterText.value = (event.target as HTMLInputElement).value
}

const editDishForm = (payload:Dish)=>{
showForm.value = 'edit'
editDishId.value = payload.id
}


const hideForm = () => {
  showForm.value = ''
}
const cancelEdit = () =>{
  showForm.value =''
}

onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  }
  else if(route.query.edit){
    showForm.value = 'edit'
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Dish name" :value="filterText" @keyup.enter="updateFilterText"
 />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm == 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />
  <EditDishForm v-else-if="showForm == 'edit'" :dishId="editDishId" @cancel-edit-dish="cancelEdit"/>        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="editDishForm" @delete-dish="dishStore.deleteDish"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
