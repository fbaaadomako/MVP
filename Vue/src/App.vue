<template>
  <div class="navpanel absolute">
    <!-- LOGO/ICON -->
    <div class="left">
      <img src="./assets/pill_icon.png" class="logo" alt="Med App" />
      <h4>MedApp</h4>
    </div>

    <!--NAV BAR-->
    <div class="float-right">
      <router-link to="/">
        <button :class="{ 'nav underline underline-offset-4': Selected, 'nav': !Selected }" @click="Selected = true">Home
        </button>
      </router-link>

      <router-link to="/medications">
        <button :class="{ 'nav underline underline-offset-4': !Selected, 'nav': Selected }"
          @click="Selected = false">Medications
        </button>
      </router-link>

      <router-view></router-view>
    </div>
  </div>

  <!--USER INTERFACE-->
  <div class="@container">
    <div class="user p-20">

      <div class="mx-10">
        <h1 class="pb-6">Hello, User</h1>
        <label>
          <p>Please enter the name of a prescription to begin:</p>
        </label>
        <div class="inputarea">
          <input class="textbox" type="text" required v-model="name" placeholder="e.g. Tylenol" />

          <button
            class="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="checkInput(e)">Enter</button>

        </div>
        <!-- Error message if input field is empty -->
        <div class="py-2 text-red-600 font-medium" v-if="nameError">{{ nameError }}</div>
      </div>

      <!-- <Teleport to="body"> -->
      <!-- use the modal component, pass in the prop -->
      <!-- Modal Pop up -->
      <!-- Pass from modal to medication updated medcards array using $emit-->
      <Modal :show="showModal" @close="showModal = false" :medname="name" @updatedmedCards="medCards">
        <template #header>
          <h2 class=" w-3/4 w-1.5 border-b-2 border-gray-300">{{ name }}</h2>
        </template>
      </Modal>
      <!-- </Teleport> -->
    </div>

    <!--MEDICATION COMPONENT-->
    <Medications :cards="medCards" />
  </div>
</template>


<script>
import Medications from "./components/Medications.vue";
import Modal from "./components/Modal.vue";


export default {
  name: "app",
  components: {
    Medications,
    Modal,
  },
  data() {
    return {
      //Use Selected class for navbar if active
      Selected: true,
      //Medication card components
      name: "",
      //Medication cards array to store user inputs
      medCards: [{}],
      //Input form modal
      showModal: false,
      nameError: "",
    }
  },
  methods: {
    // updateMeds(meds) {
    //   // let meds = "meds go here"
    //   console.log(meds)
    //   this.medCards.push({ meds })
    // },
    checkInput(e) {
      this.nameError = this.name.length > 0 ? "" : "This field cannot be empty";

      // If input field has content, open form and call handleSubmit from Modal to post info to Medication component
      if (this.nameError === "") {
        this.showModal = true
      }
    },
  },
  //GET list of medications from database
  created() {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => (this.medCards = data))
      .catch(err => console.log(err.message))
  }
}

</script>

<style>
.modal-body {
  min-width: 300px;
}


.btn-space {
  margin-right: 5px !important;
}
</style>
