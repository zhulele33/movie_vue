<template xmlns:World="http://www.w3.org/1999/xlink">
  <div class="hello">
    <h1>{{ say }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      say: 'This is the page of Hello',
      apiUrl: 'http://10.144.26.230:5555/ad/getList.json'
    }
  },ready: function() {
    this.getCustomers()
  },
  methods: {
    getCustomers: function() {
      this.$http.get(this.apiUrl)
        .then((response) => {
          console.log(response)
          this.say = 'has successed'
        })
        .catch(function(response) {
          console.log(response)
          this.say = 'failed'
        })
    }
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
