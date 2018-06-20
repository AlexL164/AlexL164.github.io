<template>
	<div class="container-fleks-NavAndContent" id="app">
		<top-bar></top-bar>
		<div class="container-fleks-UnderNavContent">
			  <tool-bar-measure class="bg-light toolbar" v-if="this.getState() == 0"/>
			  <tool-bar-instrument class="bg-light toolbar" v-if="this.getState() == 1 | this.getState() == 2"/>
			  <instrument-list :instrumentList="this.dataHelper1.instrumentList"
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
    - prevent external dropping
    - include working color management
    */

  getState() {
    return store.state.count;
  }

  // array is passed as reference, so dataHelper's instruments are always up to date
  contentUpdtd()
  {
    
  }
  
  
};
</script>

<style>
[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
}
html,
body {
  margin: 0;
  height: 100%;
}

.toolbar {
  padding: 10px;
}

.container-fleks-NavAndContent {
  display: flex; /* or inline-flex */
  flex-direction: column;
}

.container-fleks-UnderNavContent {
  display: flex; /* or inline-flex */
  flex-direction: row;
  flex: 1;
  min-height: 0;
}

#openSeadragonContainer {
  flex: 1;
}

#app {
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  line-height: 1.4;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.toolButton {
  width: 60px;
  margin: 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
}
</style>