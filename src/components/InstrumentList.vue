<template>
<div class="container bg-light instrlist">
            <transition-group name="flip-list" id="draggableItems" class="list-group"  tag="ul">
        <instrument-list-element 
        v-for="(currentInstrument,index) in instruments" :key="currentInstrument.id" 
        :indexx = "index" :instrLength="instruments.length" 
        @draggedElementChanged="draggedElementChanged" @dragOver="dragOver" @deletePressed="pressedDelete(index)"
  v-bind:data-instrumentid="currentInstrument.id" >{{currentInstrument.instrumentName}}</instrument-list-element>
            </transition-group>
              <a @click="append" class="btn btn-outline-secondary btn-sm text-secondary toolButton">+</a>
          <pre style="flex:1">
          {{this.dragSrcElId}}
  {{instruments}}
        </pre>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import instrumentListElement from "./instrumentListElement.vue";

Vue.component("instrument-list-element", instrumentListElement);

@Component
export default class InstrumentListDecorator extends Vue {
  dragSrcElId: string = "";
  dragOverOperationRunning: boolean = false;

    instruments = [
    { id: 1, instrumentName: "floot" },
    { id: 2, instrumentName: "honk" },
    { id: 3, instrumentName: "toot toot" },
    { id: 4, instrumentName: "elektronischer nasenflöter" }
  ];

  // instruments isn't directly manipulatable because on mobile devices so the manipulation have
  // there exist no "touchenter" (which could fire with the correct instrument-array object element)

  mounted() {}

  emitContentUpdated(){
    this.$emit("contentUpdated", this.instruments);
  }

  pressedDelete(i:number)
  {
    this.deleteInstrument(i,false);
    this.emitContentUpdated();
  }

  append()
  {
    this.appendElement('',true);
    this.emitContentUpdated();
  }

  draggedElementChanged(elId: string) {
    this.dragSrcElId = elId;
  }

  dragOver(overEl: HTMLElement) {
    if (!this.dragOverOperationRunning && ! overEl.classList.contains("flip-list-move")) {
      this.dragOverOperationRunning = true;
      let idSrc:string = this.dragSrcElId;
      let idDst:string = overEl.dataset.instrumentid!;
      if (idSrc != idDst) {
      this.swapInstrumentsById(idSrc, idDst);
      } else {
      }
      this.dragOverOperationRunning = false;
    }
    this.emitContentUpdated();
  }

  addElement(position: number, el: any, notifyParent:boolean) {
    this.instruments.splice(position, 0, el);
    if(notifyParent)
      this.emitContentUpdated();
  }

  // one larger then the current largest. nothing more needed yet, because the id is for internal communication only
  appendElement(newName: string, askForName: boolean) {
    if (askForName)
      newName = prompt("Please enter the name for the new instrument:")!;
    console.log(newName);
    if (newName != null) {
      if (newName == "") {
        newName = "instrument";
      }
      let largestId = 0;
      this.instruments.forEach(function(element: any) {
        // search highest id
        largestId = element.id > largestId ? element.id : largestId;
      });
      let newId = largestId + 1;
      this.instruments.push({ id: newId, instrumentName: newName });
    }
    this.emitContentUpdated();
  }

  deleteInstrument(index: number, notifyParent: boolean) {
    this.instruments.splice(index, 1);
    if(notifyParent)
      this.emitContentUpdated();
  }

  // ugly, redundant and not checking if numbers equal
  swapInstrumentsById(idSrc: string, idDst: string) {
    let indexSrc:number = this.idToIndex(idSrc);
    let indexDst:number = this.idToIndex(idDst);
    var lowerIndex = indexSrc < indexDst ? indexSrc : indexDst;
    var higherIndex = indexSrc > indexDst ? indexSrc : indexDst;

    var tempEl1 = this.instruments[lowerIndex];
    var tempEl2 = this.instruments[higherIndex];
    if (lowerIndex < higherIndex) {
      this.deleteInstrument(lowerIndex,false);
      this.deleteInstrument(higherIndex - 1,false);
      this.addElement(lowerIndex, tempEl2, false);
      this.addElement(higherIndex, tempEl1, false);
    } else {
    }
    this.emitContentUpdated();
  }

  idToIndex(id: any) {
    let calcedIndex = -1;
    this.instruments.forEach(function(element:any,index:any) {
      if(element.id == id) 
        calcedIndex = index
    });
    return calcedIndex;
  }
}
</script>