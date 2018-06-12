<template>
<div class="container bg-light instrlist">
            <transition-group name="flip-list" id="draggableItems" class="list-group"  tag="ul">
        <instrument-list-element 
        v-for="(currentInstrument,index) in instruments" :key="currentInstrument.id" 
        :indexx = "index" :instrLength="instruments.length" 
        @draggedElementChanged="draggedElementChanged" @dragOver="dragOver" @deletePressed="deleteInstrumentAtIndex"
  v-bind:data-instrumentid="currentInstrument.id" >{{currentInstrument.instrumentName}}</instrument-list-element>
            </transition-group>
              <a @click="appendElement('',true)" class="btn btn-outline-secondary btn-sm text-secondary toolButton">+</a>
          <pre style="flex:1">
          {{this.dragSrcElId}}
  {{instruments}}
        </pre>
</div>
</template>

<script lang="ts">
/* TODO
    - visulize dragged isntrument
    - clarify ids: type checking (numerical), ..
    - prevent external dropping
    - crash/error on dragging selected text in li element
    - include working color management
    - save instrumentlist
    - better septeration of list and items (crash if drag before set/start?)
    */

import { Vue, Component, Prop } from "vue-property-decorator";
import instrumentListElement from "./instrumentListElement.vue";

Vue.component("instrument-list-element", instrumentListElement);

@Component
export default class InstrumentListDecorator extends Vue {
  dragSrcElId: string = "";
  dragOverOperationRunning: boolean = false;

  // instruments isn't directly manipulatable because on mobile devices so the manipulation have
  // there exist no "touchenter" (which could fire with the correct instrument-array object element)
  instruments = [
    { id: 1, instrumentName: "floot" },
    { id: 2, instrumentName: "honk" },
    { id: 3, instrumentName: "toot toot" },
    { id: 4, instrumentName: "elektronischer nasenflöter" }
  ];

  mounted() {}

  addElement(position: number, el: any) {
    this.instruments.splice(position, 0, el);
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
  }

  deleteInstrumentAtIndex(index: number) {
    this.instruments.splice(index, 1);
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
        let indexSrc:number = this.idToIndex(idSrc);
        let indexDst:number = this.idToIndex(idDst);
        this.switchTwoInstrumentsByIndex(indexSrc, indexDst);
      } else {
      }
      this.dragOverOperationRunning = false;
    }
  }

  // ugly, redundant and not checking if numbers equal
  switchTwoInstrumentsByIndex(index1: number, index2: number) {
    var lowerIndex = index1 < index2 ? index1 : index2;
    var higherIndex = index1 > index2 ? index1 : index2;

    var tempEl1 = this.instruments[lowerIndex];
    var tempEl2 = this.instruments[higherIndex];
    if (lowerIndex < higherIndex) {
      this.deleteInstrumentAtIndex(lowerIndex);
      this.deleteInstrumentAtIndex(higherIndex - 1);
      this.addElement(lowerIndex, tempEl2);
      this.addElement(higherIndex, tempEl1);
    } else {
    }
  }

  idToIndex(id: any) {
    let calcedIndex = -1;
    this.instruments.forEach(function(element,index) {
      if(element.id == id) 
        calcedIndex = index
    });
    return calcedIndex;
  }
}
</script>