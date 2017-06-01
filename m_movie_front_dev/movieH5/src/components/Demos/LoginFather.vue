<!--suppress ALL -->
<template xmlns:World="http://www.w3.org/1999/xlink">
  <div class="hello">
    <Login @transferUser="getUser"></Login>
    <p>用户名为：{{user}}</p>
  </div>
</template>

<script>
import Login from './Login'
export default {
  name: 'father',
  data () {
    return {
      user: ''
    }
  },
  methods: {getUser (msg) { this.user = msg }},
  components: {
    Login
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
