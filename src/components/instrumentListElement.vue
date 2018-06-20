<template>
<li @dragover.stop="handleDragOver" @touchleave="handleTouchLeave"
  class="instrItems list-group-item bg-light">
    <span class="instrIcon instrDragIcon"
  @dragstart="handleDragStart" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" draggable="true" >
      <i class="fas fa-bars"></i>
    </span>
  <i v-bind:style="{ color: styleCode}" class="fas fa-circle"></i>
    <span contentEditable=true v-on:focusout="save">{{this.value}}</span>
    <span class="instrIcon instrTrashIcon" @click="$emit('deletePressed')">
      <i class="fas fa-trash-alt"></i>
    </span>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class instrumentListElement extends Vue {
  @Prop() styleCode!: String;
  @Prop() value!: String;

  handleDragStart(e: DragEvent) {
    // check if dragIcon was the source
    this.changeDragElement(<HTMLElement>e.currentTarget);
    // for visualisation only
    e.dataTransfer.setData("text/html", "");
  }

  changeDragElement(iconElement: HTMLElement) {
    let candidateForSourceListItem = (<Node>iconElement).parentNode;
    if (
      candidateForSourceListItem != null &&
      iconElement.classList.contains("instrDragIcon")
    ) {
      // tell the parent the id from the dataset
      this.$emit(
        "draggedElementChanged",
        <string>(<HTMLElement>candidateForSourceListItem).dataset.instrumentid
      );
    }
  }

  handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault(); // allows us to drop
    }
    this.$emit("dragOver", <HTMLElement>e.currentTarget);
    return false;
  }

  handleDrop(e: DragEvent) {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    return false;
  }

  handleTouchStart(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
    this.changeDragElement(<HTMLElement>e.currentTarget);
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
      if (currentTar.classList.contains("instrItems")) {
        this.$emit("dragOver", currentTar);
      }
    }
  }

  save(e: Event) {
    this.$emit("focusout", (<HTMLElement>e.target).textContent);
  }

  makeEditable(e: Event) {
    (<HTMLElement>e.target).contentEditable = "true";
  }

  makeUneditable(e: Event) {
    (<HTMLElement>e.target).contentEditable = "false";
  }
}
</script>

<style scoped>
.instrItems {
  border: none;
}

.instrItems.dragged {
  /* -border: 2px dashed #000; */
  border: 2px dashed blue;
  opacity: 0.4;
}
.instrIcon {
  padding-right: 5px;
}

.instrTrashIcon {
  position: absolute;
  right: 5px;
  cursor: pointer;
}

.instrDragIcon {
  cursor: move;
}
</style>