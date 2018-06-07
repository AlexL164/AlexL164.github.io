<template>
<div class="container bg-light instrlist">
<ul id="draggableItems" class="list-group">
  <li @dragover.stop="handleDragOver" @dragleave="handleDragLeave" @touchleave="handleTouchLeave" @dragenter="handleDragEnter" 
  v-for="(currentInstrument,index) in instruments" :key="currentInstrument.id"
  v-bind:data-instrumentid="currentInstrument.id" 
  v-bind:style="{ background: makeTechnicolor(index)}"
  class="instrItems list-group-item list-group-item-secondary">
    <span class="instrIcon instrDragIcon"
  @dragstart="handleDragStart" @dragend="handleDragEnd" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" draggable="true" >
      <i class="fas fa-bars"></i>
    </span>
    <span>{{currentInstrument.instrumentName}}</span>
    <span class="instrIcon instrTrashIcon" @click="deleteInstrumentAtIndex(index)">
      <i class="fas fa-trash-alt"></i>
    </span>
    </li>
</ul>
  <a @click="appendElement('new Instrument')" class="btn btn-outline-secondary btn-lg text-secondary toolButton">+</a>
  <a class="btn btn-outline-secondary btn-lg text-secondary toolButton">-</a>
        <pre>
          {{this.$data.dragSrcElId}}
  {{instruments}}
        </pre>
</div>
</template>

<script lang="ts">

/* TODO
    - markiert
    - Was passiert, wenn Ids nicht numerisch sind?
    - Was passiert, wenn jemand was externes droppt?
    */


import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InstrumentListDecorator extends Vue {
  data() {
    return {
      dragSrcElId: null,
      dragOverOperationRunning: null,

      // instruments isn't directly manipulatable because on mobile devices so the manipulation have
      // there exist no "touchenter" (which could fire with the correct instrument-array object element)
      instruments: [
        { id: 1, instrumentName: "floot" },
        { id: 2, instrumentName: "honk" },
        { id: 3, instrumentName: "toot toot" },
        { id: 4, instrumentName: "elektronische nasenflöte" }
      ]
    }
  }
  mounted() {
    this.$data.draggingInAction = false;
  }

  addElement(position: number, el: object) {
    this.$data.instruments.splice(position, 0, el);
  }

  // one larger then the current largest. nothing more needed yet, because the id is for internal communication only
  appendElement(newName: string) {
    let largestId = 0;
    this.$data.instruments.forEach(function(element:any) {
          // größte Id suchen
          largestId = element.id >largestId ? element.id : largestId;
        });
    let newId = largestId + 1;
    this.$data.instruments.push({id: newId,instrumentName: newName});
  }

  deleteInstrumentAtIndex(index: number) {
    this.$data.instruments.splice(index, 1);
  }

  handleDragStart(e: DragEvent) {
    let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
    if (
      candidateForSourceListItem != null &&
      (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon")
    ) {
      this.$data.dragSrcElId = (<HTMLElement>candidateForSourceListItem).dataset.instrumentid;
      console.log("now dragging id" + this.$data.dragSrcElId);
      e.dataTransfer.setData("text/html", "");
      this.dragStart();
    }
  }

  handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    if (!this.$data.dragOverOperationRunning) {
      this.$data.dragOverOperationRunning = true;
      this.dragOver(<HTMLElement>e.currentTarget);
      this.$data.dragOverOperationRunning = false;
    }
    return false;
  }

  handleDragEnter(e: DragEvent) {
    // this / e.target is the current hover target.
  }

  handleDragLeave(e: DragEvent) {
    this.leave(<HTMLElement>e.target);
  }

  handleDrop(e: DragEvent) {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    this.dragFinished(<HTMLElement>e.target);
    return false;
  }

  handleDragEnd(e: DragEvent) {
    this.dragFinished(<HTMLElement>e.target);
  }

  handleTouchStart(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
    let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
    if (
      candidateForSourceListItem != null &&
      (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon")
    ) {
      this.$data.dragSrcElId = (<HTMLElement>candidateForSourceListItem).dataset.instrumentid;
      console.log("now dragging id" + this.$data.dragSrcElId);
      this.dragStart();
    }
  }

  handleTouchEnd(e1: Event) {
    e1.preventDefault();
    let e = <TouchEvent>e1;
    this.dragFinished(<HTMLElement>e.target);
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
        this.dragOver(currentTar);
      } else {
      }
    } else {
    }
  }

  dragStart() {}

  dragOver(overEl: HTMLElement) {
    var idSrc = this.$data.dragSrcElId;
    var idDst = overEl.dataset.instrumentid;

    if (idSrc != idDst) {
      let indexSrc = this.idToIndex(idSrc);
      let indexDst = this.idToIndex(idDst);
      this.switchTwoInstrumentsByIndex(indexSrc, indexDst);
    } else {
    }
  }

  dragFinished(dropEl: HTMLElement) {}

  leave(leftEl: HTMLElement) {
    let isJustChildOfActive: boolean = false;
    if (leftEl.parentElement != null)
      isJustChildOfActive = leftEl.parentElement.classList.contains("dragged");
    if (typeof leftEl.classList != "undefined" && isJustChildOfActive) {
    }
  }

  //unschööön, redundant und beide können gleich sein
  switchTwoInstrumentsByIndex(index1: number, index2: number) {
    var lowerIndex= index1 < index2 ? index1:index2;
    var higherIndex= index1 > index2 ? index1:index2;

    var tempEl1 = this.$data.instruments[lowerIndex];
    var tempEl2 = this.$data.instruments[higherIndex];
    if (lowerIndex < higherIndex) {
      this.deleteInstrumentAtIndex(lowerIndex);
      this.deleteInstrumentAtIndex(higherIndex - 1);
      this.addElement(lowerIndex, tempEl2);
      this.addElement(higherIndex, tempEl1);
    } else {
    }
  }

  idToIndex(id: any) {
    return this.$data.instruments.findIndex(function(element: any) {
      return element.id == id;
    });
  }

  makeTechnicolor(n:number) {
    var nElements = this.$data.instruments.length;
    var colorDistance = 255.0 / nElements;
    var styleCode = ("hsl(" + colorDistance * n + ", 100%, 81%)");
    console.log(styleCode);
    return styleCode;
    //return "yellow";
  }
}
</script>