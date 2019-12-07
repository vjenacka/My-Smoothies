<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing,i) in ingredients" :key="i">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[i]" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (Tab):</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        />
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center-align">
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: "",
      ingredients: [],
      another: "",
      feedback: ""
    };
  },
  methods: {
    addSmoothie() {
      console.log(this.title, this.ingredients);
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.feedback = "";
        this.another = "";
      } else {
        this.feedback = "You must enter a value to add and ingredient";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;

  h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .field {
    margin: 20px auto;
  }
}
</style>