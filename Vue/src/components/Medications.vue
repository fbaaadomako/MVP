<template>
  <ul>
    <div class="mx-20 grid grid-cols-1 sm:grid-cols-2">

      <li v-for="card in cards">
        <div class="card">

          <h2>{{ card.name }}
            <div class="dose">{{ (card.dose) }}</div>
          </h2>
          <div class="w-1/2 w-1.5 border-b-2 border-gray-300" />

          <!-- Display TIME or TIMES depending on frequency amount -->
          <p v-if="card.frequency > 1"><strong>Daily Frequency:</strong> {{ card.frequency }} times a day</p>
          <p v-else> <strong>Daily Frequency:</strong> {{ card.frequency }} time a day</p>

          <p v-if="card.reason"><strong>Prescribed for:</strong> {{ card.reason }}</p>

          <p v-if="card.doctor"><strong>Prescribing Physician:</strong> {{ card.doctor }}</p>

          <button @click="handleDelete(card.id)">
            <img src="../assets/delete.png" class="icon">
          </button>

        </div>


      </li>

    </div>
  </ul>
</template>

<script>

export default {
  name: "Medications",
  props: ["cards"],
  data() {
    return {
      name: "",
      dose: "",
      reason: "",
      frequency: "",
      doctor: "",
      medCards: [{}]
    };
  },
  methods: {
    handleDelete(id) {
      if (confirm(`Are you sure you want to remove this?`)) {
        fetch(`http://localhost:4000/${id}`, {
          method: "DELETE",
        })
          .then(response => { response.json() })
          .then(data => this.medCards = [...data])
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
}

</script>

<style></style>