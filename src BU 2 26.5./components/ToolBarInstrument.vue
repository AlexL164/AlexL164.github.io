<template>
<div class="container bg-light">
  
    <a href="#" @click="toggleInstrumentState" class="btn btn-primary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-list-ul"></i></a> 
<br>
    <a href="#" class="btn btn-primary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-cut"></i></a> 
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import store from "./store/";

@Component
export default class ToolBarDecorator extends Vue {
      toggleInstrumentState() {
          store.commit('TOGGLELISTSTATE');
    }
}
</script>