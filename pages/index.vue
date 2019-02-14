<template>
  <section id="sectionContainer" class="container d-flex h-100">
    <div style="position:relative;" class="offset-md-3 col-md-6 justify-content-center align-self-center">
      <div v-if="loading" class="loader"></div>

      <p class="h1">Hi, we need some data</p>

      <div v-if="alert" class="alert" :class="{'alert-success': !errors, 'alert-danger': errors}" role="alert">
        {{message}}
      </div>
      <form @submit.prevent="sendData">
        <div :class="{blured: loading}" >
          <div class="form-group">
            <div class="form-group">
              <input required placeholder="Name" type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
              <input required placeholder="Age" type="number" min="0" max="100" class="form-control" v-model="age">
            </div>
            <div class="form-group">
              <input required placeholder="City" type="text" class="form-control" v-model="city">
            </div>
          </div>
        </div>
        <button :disabled="loading" typeof="submit" class="btn btn-success full-width">{{loading ? 'Wait for it!': 'Send Data'}}</button>
      </form>

    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  sockets: {

  },
  data () {
    return {
      message: '',
      alert: false,
      errors: false,
      loading: false,
      name: '',
      age: null,
      city: ''
    }
  },
  beforeMount () {
    console.log(this.$socket)
  },
  mounted () {

  },
  methods: {
    sendData: function () {
      this.loading = true
      this.alert = false
      let data = {name: this.name, age: this.age, city: this.city}
      axios
        .post(`http://127.0.0.1:8000/`, data)
        .then(response => {
          console.log(response)

          this.alert = true
          this.message = 'We got it! Thanks ;)'
        })
        .catch(error => {
          console.log(error.response.data);
          this.alert = true
          this.errors = true
          this.message = error.response.data.error

        })
        .finally(() => (this.loading = false));
    }
  }
}
</script>

<style>
  #sectionContainer {
    padding-top: 200px;
  }
  .full-width {
    width: 100%;
    text-align: center;
  }

  .blured {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
  .loader {
    z-index: 1000;
    position: absolute;
    color: black;
    font-size: 20px;
    margin: 100px auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    /*position: relative;*/
    text-indent: -9999em;
    left: 45%;
    top: 20px;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  @-webkit-keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }
  @keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }

</style>

