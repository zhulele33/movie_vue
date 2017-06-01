<template>
	<ul class="areabox clearfix">
      <li v-for="areaitem in areaData">
        <a href="javascript:;" :dirId="areaitem.regionid" v-on:click="freshCinemaList(areaitem)">{{areaitem.regionname}}</a> 
      </li>
    </ul>
</template>
<script >
	
</script>
<style lang="scss" scoped>
	
</style>