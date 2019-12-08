<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{smoothie.title}}</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div v-for="(ing,i) in smoothie.ingredients" :key="i" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[i]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" v-model="another" />
        <div class="btn-floating btn-small halfway-fab pink darken-2 add" @click="addIngredient">
          <i class="material-icons">add</i>
        </div>
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center-align">
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: "",
      feedback: ""
    };
  },
  methods: {
    editSmoothie() {
      console.log(this.smoothie.title, this.smoothie.ingredients);
    },
    addIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.feedback = "";
        this.another = "";
      } else {
        this.feedback = "You must enter a value to add and ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => ingredient !== ing
      );
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        //temp objekat za pohranu drill-ovanih vrijednosti
        let newObj = {};
        newObj.id = doc.id;
        newObj.title = doc._document.proto.fields.title.stringValue;
        newObj.slug = doc._document.proto.fields.slug.stringValue;
        newObj.ingredients = [];
        doc._document.proto.fields.ingredients.arrayValue.values.forEach(
          val => {
            newObj.ingredients.push(val.stringValue);
          }
        );
        this.smoothie = newObj;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.edit-smoothie {
  padding: 20px;
  max-width: 500px;

  h2 {
    font-size: 2em;
    margin: 50px auto;
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