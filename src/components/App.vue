<template>
	<div class="container-fleks-NavAndContent" id="app">
		<top-bar></top-bar>
		<div class="container-fleks-UnderNavContent">
			  <tool-bar-measure class="bg-light toolbar" v-if="getState == 0"/>
			  <tool-bar-instrument class="bg-light toolbar" v-if="getState == 1 | getState == 2"/>
			  <instrument-list v-if="getState == 2"/>
   	 		<div id="openSeadragonContainer">  <!--hier openseadragon--> </div>
  		</div>
	</div>
</template>

<script lang="ts">
import TopBar from "./TopBar.vue";
import ToolBarMeasure from "./ToolBarMeasure.vue";
import ToolBarInstrument from "./ToolBarInstrument.vue";
import InstrumentList from "./InstrumentList.vue";
import store from "./store/";

export default {
  components: {
    TopBar,
    ToolBarMeasure,
    ToolBarInstrument,
    InstrumentList
  },
  computed: {
    // a computed getter
    getState: function() {
      return store.state.count;
    }
  }
};
</script>

<style src="./toolbar.css"></style>