<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <section>
    <div id="testVuediv"></div>
    <div>
       <label>
          <span>用户名：</span>
          <input v-model="username" v-on:change="setuser" />
       </label>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        username: ''
      }
    },
    methods: {setuser :function () {
          this.$emit('transferUser', this.username)
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
