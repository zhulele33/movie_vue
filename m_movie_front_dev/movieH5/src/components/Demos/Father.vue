<!--suppress ALL -->
<template xmlns:World="http://www.w3.org/1999/xlink">
  <div class="hello">
    <Child :logo='say'></Child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'father',
  data () {
    return {
      say: {
          father1: 'father1 say',
          father2: 'father2 say'
      }
    }
  },
  components: {
    Child
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
