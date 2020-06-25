<template>
  <div class="form">
    <form class="w-full max-w-sm" @change="updateFirestore">
      <h3
        class="md:flex md:items-center mb-6"
      >Please fill out this form. {{percentage}}% is completed.</h3>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-field-1"
          >Field 1</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-field-1"
            type="text"
            placeholder="Value 1"
            v-model="formData.field1"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-field-2"
          >Field 2</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-field-2"
            type="text"
            placeholder="Value 2"
            v-model="formData.field2"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-field-3"
          >Field 3</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-field-3"
            type="text"
            placeholder="Value 3"
            v-model="formData.field3"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-field-4"
          >Field 4</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-field-4"
            type="text"
            placeholder="Value 4"
            v-model="formData.field4"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-field-5"
          >Field 5</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-field-5"
            type="text"
            placeholder="Value 5"
            v-model="formData.field5"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../firestore";
import axios from "axios";

const documentPath = "form/form";

export default {
  name: "Form",

  data() {
    return {
      firestoreData: null,
      formData: {},
      percentage: Number
    };
  },

  firestore() {
    return {
      firestoreData: db.doc(documentPath)
    };
  },

  methods: {
    async updateFirestore() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.getPercentage();
      } catch (error) {
        this.errorMessage = JSON.stringify(error);
      }
    },

    getPercentage() {
      axios
        .get(
          process.env.VUE_APP_CLOUD_FUNCTION_URL
        )
        .then(response => (this.percentage = response.data.percentage))
        .catch(error => console.log(error));
    }
  },

  created: async function() {
    const documentRef = db.doc(documentPath);
    let data = (await documentRef.get()).data();

    if (!data) {
      data = { field1: "", field2: "", field3: "", field4: "", field5: "" };
    }

    this.formData = data;
    this.getPercentage();
  }
};
</script>
