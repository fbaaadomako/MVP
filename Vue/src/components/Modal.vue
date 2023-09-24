<template>
  <Transition name="modal">
    
    <div v-if="show" class="modal-mask">
      
      <div class="modal-container">
        <button type="button" 
    @click="handleModalClose()" class="close"> 
    <img src="../assets/close.png" class="close-btn">
</button>
        <div class="modal-body">
          
        <div class="modal-header"> 
          <slot name="header" />
    
        </div>
     
        <div class="content-center">
    
     
    
            <form>
              <label>Dose:</label>
              <input type="text" required v-model="dose" />

              <label>Reason:</label>
              <input type="text" v-model="reason" />

              <label>Daily Frequency: </label>
              <input type="number" required v-model="frequency" />

              <label>Prescribing Physician:</label>
              <input type="text" v-model="doctor" />
            </form>
          </div>

          <div class="text-red-600 font-medium" v-if="modalError">{{ modalError }}</div>

          <button
            class="btn mt-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
            @click.prevent="handleSubmit()">Save & Continue</button>

        </div>
      </div>
      <div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: Boolean,
    medname: String, //['medname']
  },
  data() {
    return {
      dose: "",
      reason: "",
      frequency: 0,
      doctor: "",
      modalError: "",
      medCards: [{}],
    }
  },
  methods: {
    handleSubmit() {
      this.modalError = (this.frequency > 0 && this.dose.length > 0) ?
        "" : "Please complete all required fields";
      if (this.modalError === "") {
        fetch('http://localhost:4000/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.medname,
            dose: this.dose,
            reason: this.reason,
            frequency: this.frequency,
            doctor: this.doctor,
          })
        })
          .then(response => response.json())
          //POST data to medCards array by creating a copy with spread operator and adding new inputs
          .then(data => {
            this.$emit('updatedmedCards', data)
            //Reset modal
            this.dose = '';
            this.reason = '';
            this.frequency = 0;
            this.doctor = '';
            this.$emit('close')
          })
          .catch(error => {
            console.log(error);
          });
      }

    },
    handleModalClose() {
     this.$emit('close');
    },
  }
}

</script>

<style></style>