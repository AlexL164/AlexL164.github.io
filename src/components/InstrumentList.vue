<template>
<div class="container bg-light instrlist">
            <transition-group name="flip-list" id="draggableItems" class="list-group"  tag="ul">
        <instrument-list-element    v-bind:value="currentInstrument.name"
  v-on:focusout="changeName($event,index)"
        v-for="(currentInstrument,index) in this.instrs" :key="currentInstrument.id" 
        :indexx = "index" :instrLength="this.instrslength" 
        @draggedElementChanged="draggedElementChanged" @dragOver="dragOver" @deletePressed="pressedDelete(index)"
  v-bind:data-instrumentid="currentInstrument.id" ></instrument-list-element>
            </transition-group>
              <a @click="append" class="btn btn-outline-secondary btn-sm text-secondary toolButton">+</a>
          <pre style="flex:1">
          {{this.dragSrcElId}}
  {{this.instrs}}
        </pre>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import instrumentListElement from "./instrumentListElement.vue";
import DataInstrumentList from "./DataInstrumentList";

Vue.component("instrument-list-element", instrumentListElement);

@Component
export default class InstrumentListDecorator extends Vue {
  // careful! prop must! be given
  @Prop() instrumentList !: DataInstrumentList;

  get instrs(){
    return this.instrumentList.getInstrumentsAsArrayOfObjects();
  }

  changeName(newName:any,i:number)
  {
    this.instrumentList.getNames()[i]=newName;
  }

  dragSrcElId: string = "";
  dragOverOperationRunning: boolean = false;

 

  // deepcopy: obj2:any = JSON.parse(JSON.stringify(this.obj));

  // instruments isn't directly manipulatable because on mobile devices so the manipulation have
  // there exist no "touchenter" (which could fire with the correct instrument-array object element)

  mounted() {
    
    }

  emitContentUpdated(){
    // this.$emit("contentUpdated", this.instruments);
  }

  pressedDelete(i:number)
  {
    this.instrumentList.deleteInstrument(i);
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
      this.instrumentList.swapInstrumentsById(idSrc, idDst);
      } else {
      }
      this.dragOverOperationRunning = false;
    }
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
      this.instrumentList.getIds().forEach(function(element: number) {
        // search highest id
        largestId = element > largestId ? element : largestId;
      });
      let newId = largestId + 1;
      this.instrumentList.appendInstrument( newId, newName );
    }
    this.emitContentUpdated();
  }
}
</script>