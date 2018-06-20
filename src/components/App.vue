<template>
	<div class="container-fleks-NavAndContent" id="app">
		<top-bar></top-bar>
		<div class="container-fleks-UnderNavContent">
			  <tool-bar-measure class="bg-light toolbar" v-if="this.getState() == 0"/>
			  <tool-bar-instrument class="bg-light toolbar" v-if="this.getState() == 1 | this.getState() == 2"/>
			  <instrument-list :instrumentList="this.dataHelper1._instrumentList" :obj="this.dataHelper1"
        @append="appendElement('',true)" @contentUpdated="contentUpdtd"
        v-if="this.getState() == 2"/>
   	 		<div id="openSeadragonContainer">  <!--hier openseadragon--> </div>
  		</div>
      {{ this.dataHelper1.testString}}
	</div>
</template>

<script lang="ts">
import TopBar from "./TopBar.vue";
import ToolBarMeasure from "./ToolBarMeasure.vue";
import ToolBarInstrument from "./ToolBarInstrument.vue";
import InstrumentList from "./InstrumentList.vue";
import store from "./store/";
import DataHelper from "./DataHelper";
import { Vue, Component} from "vue-property-decorator";

let dataHelper = new DataHelper();

Vue.component("top-bar", TopBar);
Vue.component("tool-bar-measure", ToolBarMeasure);
Vue.component("tool-bar-instrument", ToolBarInstrument);
Vue.component("instrument-list", InstrumentList);

@Component
export default class App extends Vue {
  
  dataHelper1:any = dataHelper;

/* TODO
    - visulize dragged isntrument
    - clarify ids: type checking (numerical), ..
    - prevent external dropping
    - crash/error on dragging selected text in li element
    - include working color management
    - better septeration of list and items (crash if drag before set/start?)
    - comment
    - save instrument list, data-idea see below
    */

  getState() {
    return store.state.count;
  }

  // array is passed as reference, so dataHelper's instruments are always up to date

  contentUpdtd(content:any)
  {
      console.log(content);
  }
  
  
};
</script>

<style src="./toolbar.css"></style>