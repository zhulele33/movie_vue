<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>

</template>

<script>
export default {
  name: 'world',
  data () {
    return {
      msg: 'this is the message',
      apiUrl: 'http://10.144.26.230:5555/ad/getList.json'
    }
  },ready: function() {
    this.getCustomers()
  },
  methods: {
    reverseMessage: function() {
      this.$http.jsonp(this.apiUrl)
        .then((response) => {
          console.log(response)
          this.msg = 'has successed'
        })
        .catch(function(response) {
          console.log(response)
          this.msg = 'failed'
        })
    }
  }
  ,
/*  methods: {
    reverseMessage: function () {
      this.msg = 'just test !!!'
    }
  },*/
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
