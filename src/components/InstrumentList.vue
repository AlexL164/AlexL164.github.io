<template>
<div class="container bg-light instrlist">
            <transition-group name="flip-list" id="draggableItems" class="list-group"  tag="ul">
        <instrument-list-element    v-bind:value="currentInstrument.name"
  v-on:focusout="changeName($event,index)"
        v-for="(currentInstrument,index) in this.instrs" :key="currentInstrument.id" 
        :styleCode="generateColor(index)"
        @draggedElementChanged="draggedElementChanged" @dragOver="dragOver" @deletePressed="pressedDelete(index)"
  v-bind:data-instrumentid="currentInstrument.id" ></instrument-list-element>
            </transition-group>
              <a @click="append" class="btn btn-outline-secondary btn-sm text-secondary toolButton">+</a>
          <pre style="flex:1">
          {{this.idDragSource}}
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
  @Prop() instrumentList!: DataInstrumentList;

  // id of dragged li element
  idDragSource: string = "";
  // prevents double drags 
  dragOverOperationRunning: boolean = false;

  get instrs() {
    return this.instrumentList.getInstrumentsAsArrayOfObjects();
  }

  get instrsLength() {
    return this.instrumentList.getInstrumentsAsArrayOfObjects().length;
  }

  changeName(newName: any, i: number) {
    this.instrumentList.getNames()[i] = newName;
  }

  emitContentUpdated() {
    // notify parent
    this.$emit("contentUpdated");
  }

  pressedDelete(index: number) {
    this.instrumentList.deleteInstrumentByIndex(index);
    this.emitContentUpdated();
  }

  append() {
    this.appendElement("", true);
    this.emitContentUpdated();
  }

  draggedElementChanged(elId: string) {
    this.idDragSource = elId;
  }

  dragOver(overEl: HTMLElement) {
    if (
      !this.dragOverOperationRunning &&
      !overEl.classList.contains("flip-list-move")
    ) {
      this.dragOverOperationRunning = true;

      // get Ids of source and destination elements
      let idSrc: string = this.idDragSource;
      let idDst: string = overEl.dataset.instrumentid!;
      if (idSrc != idDst) {
        this.instrumentList.swapInstrumentsById(idSrc, idDst);
      } else {
      }
      this.dragOverOperationRunning = false;
    }
    this.emitContentUpdated();
  }

  // appends Element with id=highestId+1
  appendElement(newName: string, askForName: boolean) {
    if (askForName)
      newName = prompt("Please enter the name for the new instrument:")!;
    // check if pressed "okay"
    if (newName != null) {
      if (newName == "") {
        newName = "instrument";
      }
      // search highest id
      let largestId = this.instrumentList.getIds().reduce(function(a, b) {
        return Math.max(a, b);
      });
      let newId = largestId + 1;
      this.instrumentList.appendInstrument(newId, newName);
    }
    this.emitContentUpdated();
  }

  // test feature
  generateColor(n: number) {
    n = n / this.instrsLength;
    var styleCode = "hsl(" + 100 * n + ", 100%, 81%)";
    return styleCode;
  }
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.4s;
}

.flip-list-enter-active {
  transition: all 0.3s ease;
}

.flip-list-leave-active {
  transition: all 0.1s ease;
}

.flip-list-enter,   .flip-list-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.instrlist {
  width: 260px; /* Set the width of the sidebar - or:max-with */
  padding-left: 0;
  display: flex;
  flex-direction: column;
}
</style>