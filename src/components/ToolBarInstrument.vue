<template>
<div>
  
    <a href="#" @click="toggleInstrumentState" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true">
     <span class="fa-layers fa-fw">
       <i class="fas fa-list-ul"></i>
     <div v-if="getState() == 2"><i class="fas fa-caret-right" data-fa-transform="shrink-2 right-12"></i></div>
  </span>
    </a> 
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-cut"></i></a> 
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-eraser"></i></a>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import store from "./store/";

@Component
export default class ToolBarDecorator extends Vue {
  toggleInstrumentState() {
    store.commit("TOGGLELISTSTATE");
  }

  getState() {
    return store.state.count;
  }
}
</script>