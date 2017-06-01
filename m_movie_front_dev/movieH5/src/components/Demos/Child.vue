<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="hello">
    <h1>this is the message from all father: {{ logo }}</h1>
    <h1>this is the message from father1: {{ logo.father1 }}</h1>
    <h1>{{ test1 }}</h1>
    <h1>{{ test2.child }}</h1>
  </div>

</template>

<script>
  export default {
    name: 'child',
    props: ['logo'],
    data()
    {
        return {
            test1:'hello test1',
            test2: {
                child: 'test2 child'
            }
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
