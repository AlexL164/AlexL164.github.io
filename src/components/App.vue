<template>
	<div id="app">
		<TopBar/>
		<div class="container underTopBar">
  		<div class="row">
			<ToolBarMeasure class="col-12 col-md-auto" v-if="getState == 0"/>
			<ToolBarInstrument class="col-12 col-md-auto" v-if="getState == 1 | getState == 2"/>
			<InstrumentList class="col-12 col-md-auto" v-if="getState == 2"/>
   	 		<div class="col">  <!--hier openseadragon--> </div>
  		</div>
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