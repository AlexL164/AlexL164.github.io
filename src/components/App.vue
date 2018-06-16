<template>
	<div class="container-fleks-NavAndContent" id="app">
		<top-bar></top-bar>
		<div class="container-fleks-UnderNavContent">
			  <tool-bar-measure class="bg-light toolbar" v-if="this.getState() == 0"/>
			  <tool-bar-instrument class="bg-light toolbar" v-if="this.getState() == 1 | this.getState() == 2"/>
			  <instrument-list 
        @append="appendElement('',true)" @contentUpdated="contentUpdtd"
        v-if="this.getState() == 2"/>
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
import dataHelper from "./dataHelper";
import { Vue, Component} from "vue-property-decorator";

let greeter = new dataHelper("world");
alert(greeter.greet());

Vue.component("top-bar", TopBar);
Vue.component("tool-bar-measure", ToolBarMeasure);
Vue.component("tool-bar-instrument", ToolBarInstrument);
Vue.component("instrument-list", InstrumentList);

@Component
export default class App extends Vue {
  greeter:any;

/* TODO
    - visulize dragged isntrument
    - clarify ids: type checking (numerical), ..
    - prevent external dropping
    - crash/error on dragging selected text in li element
    - include working color management
    - better septeration of list and items (crash if drag before set/start?)
    - comment
    */

  getState() {
    return store.state.count;
  }

  // data idea= dataHelper-property as comp-startvalue via this.localdata=property, emit contentchange, change datahelper-property
  // that way, we dont mutate a prop (which would work, as it is an array, butits not nice) 
  // but we can still leave the list processing in the listcomponent

  contentUpdtd(content:any)
  {
      console.log(content);
  }
  
  
};
</script>

<style src="./toolbar.css"></style>