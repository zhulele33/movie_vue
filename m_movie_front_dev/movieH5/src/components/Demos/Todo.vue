<template xmlns:World="http://www.w3.org/1999/xlink">
  <div>
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
    <CompletedTodos></CompletedTodos>
  </div>
</template>

<script>
  import GetTodo from './vuexSimpleDemo/GetTodo'
  import CurrentTodos from './vuexSimpleDemo/CurrentTodos'
  import CompletedTodos from './vuexSimpleDemo/CompletedTodos'
export default {
  name: 'todo',
  components: {
    GetTodo,
    CurrentTodos,
    CompletedTodos
  }
}
</script>

