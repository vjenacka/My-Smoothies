<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <ul>
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      //brise doc is firestora i filtrira ga iz array
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(
            smoothie => smoothie.id !== id
          );
        });
    }
  },
  created() {
    //fetchamo kolekciju iz firestore db
    db.collection("smoothies")
      .get()
      .then(snapshot =>
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
          this.smoothies.push(newObj);
        })
      );
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;

  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  ul {
    margin: 30px auto;

    li {
      display: inline-block;
    }
  }

  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 1, 4em;
    color: #aaa;
    cursor: pointer;
  }
}
</style>