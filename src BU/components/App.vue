<template>
	<div id="app">
		<TopBar/>
		<ToolBarMeasure v-if="state==0"/>
		<ToolBarInstrument  v-if="state==1"/>
	</div>
</template>

<script>
import TopBar from './TopBar.vue'
import ToolBarMeasure from './ToolBarMeasure.vue'
import ToolBarInstrument from './ToolBarInstrument.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	components: {
		TopBar, ToolBarMeasure, ToolBarInstrument
	},
   computed: {
  	state: {
    // getter
    get: function () {
      return store.state.count
    },
    }
}
}
</script>

<style>
#app {
	max-width: 600px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: blue;
}

h1 {
	text-align: center;
}
</style>