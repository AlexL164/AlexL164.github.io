<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
<nav class="navbar navbar-expand navbar-light bg-light">
  <a class="navbar-brand" href="#">Vertaktor</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fas fa-undo"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fas fa-save"></i></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-secondary active" @click="doMeasureState">
    <input type="radio" name="options" id="option1" autocomplete="off" checked> Takte
  </label>
  <label class="btn btn-secondary" @click="doInstrumentState">
    <input type="radio" name="options" id="option2" autocomplete="off"> Instrumente
  </label>
</div>
  </div>
</nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import store from "./store/";

@Component
export default class TopBarDecorator extends Vue {
    doMeasureState() {
          store.commit('DOMEASURESTATE');
    }
    doInstrumentState() {
          store.commit('DOINSTRUMENTSTATE');
    }
}

</script>

<style>
</style>
