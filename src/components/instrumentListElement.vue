<template>
<li @dragover.stop="handleDragOver" @dragleave="handleDragLeave" @touchleave="handleTouchLeave" @dragenter="handleDragEnter" 
  class="instrItems list-group-item bg-light">
    <span class="instrIcon instrDragIcon"
  @dragstart="handleDragStart" @dragend="handleDragEnd" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" draggable="true" >
      <i class="fas fa-bars"></i>
    </span>
  <i v-bind:style="{ color: makeTechnicolor(indexx)}" class="fas fa-circle"></i>
   <input type="color" id="head" name="color" value="#e66465" />
    <span contentEditable=true v-on:focusout="save"><!-- @focusout="save" @click="makeEditable"-->{{this.value}}</span>
    <span class="instrIcon instrTrashIcon" @click="$emit('deletePressed',indexx)">
      <i class="fas fa-trash-alt"></i>
    </span>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class instrumentListElement extends Vue {
  @Prop() indexx!: number;
  @Prop() instrLength!: number;
  @Prop() value!: String;

  handleDragStart(e: DragEvent) {
    let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
    if (
      candidateForSourceListItem != null &&
      (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon")
    ) {
      this.$emit(
        "draggedElementChanged",
        <string>(<HTMLElement>candidateForSourceListItem).dataset.instrumentid
      );
      e.dataTransfer.setData("text/html", "");
    }
  }

  handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.$emit("dragOver", <HTMLElement>e.currentTarget);
    return false;
  }

  handleDragEnter(e: DragEvent) {
    // this / e.target is the current hover target.
  }

  handleDragLeave(e: DragEvent) {
  }

  handleDrop(e: DragEvent) {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    return false;
  }

  handleDragEnd(e: DragEvent) {
  }

  handleTouchStart(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
    let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
    if (
      candidateForSourceListItem != null &&
      (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon")
    ) {
      this.$emit(
        "draggedElementChanged",
        <string>(<HTMLElement>candidateForSourceListItem).dataset.instrumentid
      );
    }
  }

  handleTouchEnd(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
  }

  handleTouchLeave(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
  }

  handleTouchMove(e1: Event) {
    e1.preventDefault();
    // get list element:
    let e = <TouchEvent>e1;
    let currentTar: any = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (currentTar != null) {
      console.log(currentTar);
      if (currentTar.classList.contains("instrItems")) {
        this.$emit("dragOver", currentTar);
      } else {
      }
    } else {
    }
  }

  save(e: Event)
  {
    this.$emit('focusout', (<HTMLElement>e.target).textContent);
  }

  makeEditable(e: Event) {
    (<HTMLElement>e.target).contentEditable = "true";
  }

  makeUneditable(e: Event) {
    (<HTMLElement>e.target).contentEditable = "false";
  }

  // works and I don't know why
  // (vue seems not to rerender icon?)
  makeTechnicolor(n: number) {
    var nElements = this.instrLength;
    var colorDistance = 255.0 / nElements;
    var styleCode = "hsl(" + colorDistance * n + ", 100%, 81%)";
    return styleCode;
    // return "yellow";
  }
}
</script>