<template>
<div>
  
    <div class="btn-group-vertical toolButton" role="group" aria-label="Basic example">
    <a href="#" class="btn btn-outline-secondary btn-lg" role="button" aria-pressed="true"><i class="fas fa-th-large"></i></a>
    <a href="#" class="btn btn-outline-secondary btn-lg" role="button" aria-pressed="true"><i data-fa-transform="rotate-345" class="fas fa-th-large"></i></a>
    <a href="#" class="btn btn-outline-secondary btn-lg" role="button" aria-pressed="true"><i class="fab fa-windows"></i></a>
</div>
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-cut"></i></a> 
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-eraser"></i></a>
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-tag"></i></a>
<br>
    <a href="#" class="btn btn-outline-secondary btn-lg toolButton" role="button" aria-pressed="true"><i class="fas fa-list-ol"></i></a>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ToolBarDecorator extends Vue {
}
</script>