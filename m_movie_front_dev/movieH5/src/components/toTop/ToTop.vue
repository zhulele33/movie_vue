<template>
	<a class="toTop" :class="{'hide':isHide}" v-on:click="toTop"></a>
</template>
<script>
	export default {
		name:'toTop',
		data(){
			return{

			}
		},
		props:['isHide'],
		methods:{
			toTop:function(){
				this.$emit('toTop');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.toTop{
	    position: fixed;
	    left: 50%;
	    bottom: 1.5rem;
	    width: 1.75rem;
	    height: 1.75rem;
	    background-image: url("../../assets/totop.png");
	    margin-left: 6.5rem;
	    cursor: pointer;
	  }
	// .hide{display:none;}
</style>