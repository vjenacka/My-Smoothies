<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing,i) in ingredients" :key="i" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[i]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          v-model="another"
        />
        <div class="btn-floating btn-small halfway-fab pink darken-2 add" @click="addIngredient">
          <i class="material-icons">add</i>
        </div>
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center-align">
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";
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
      if (this.title && this.ingredients.length) {
        this.feedback = "";
        //pretvaramo naslovu u slug radi route-anja
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You need to enter a smoothie title and ingredients";
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.feedback = "";
        this.another = "";
      } else {
        this.feedback = "You must enter a value to add and ingredient";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(
        ingredient => ingredient !== ing
      );
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
    position: relative;
  }

  .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }

  .add {
    position: absolute;
    right: 0;
    bottom: 14px;
    cursor: pointer;
  }
}
</style>