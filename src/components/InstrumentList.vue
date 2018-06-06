<template>
<div class="container bg-light instrlist">
<ul id="draggableItems" class="list-group">
  <li @dragover="handleDragOver" @dragleave="handleDragLeave" @touchleave="handleTouchLeave" @dragenter="handleDragEnter" 
  v-for="(i,index) in instruments" :key="i.id" 
  v-bind:id="'instrumentItem_' + i.id" 
  class="instrItems list-group-item list-group-item-secondary">
    <span class="instrIcon instrDragIcon" 
  @dragstart="handleDragStart" @dragend="handleDragEnd" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" draggable="true" >
      <i class="fas fa-bars"></i>
    </span>
    <span>{{i.instrumentName}}</span>
    <span class="instrIcon instrTrashIcon" @click="deleteInstrument(index)">
      <i class="fas fa-trash-alt"></i>
    </span>
    </li>
</ul>
  <a @click="addElement" class="btn btn-outline-secondary btn-lg text-secondary toolButton">+</a>
  <a class="btn btn-outline-secondary btn-lg text-secondary toolButton">-</a>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InstrumentListDecorator extends Vue {

  data(){
    return {
    dragSrcEl: null,
    dragDropData: null,

  // instruments isn't directly manipulatable because on mobile devices so the manipulation have
  // there exist no "touchenter" (which could fire with the correct instrument-array object element)
      instruments: [
        {id: 1, instrumentName: 'floot'},
        {id: 2, instrumentName: 'honk'},
        {id: 3, instrumentName: 'toot toot'},
        {id: 4, instrumentName: 'elektronische nasenflöte'}
      ]
    }
  }
   mounted () {
  }
  addElement () {
    let newId:number = this.$data.instruments[this.$data.instruments.length - 1].id + 1;
    this.$data.instruments.push({instrumentName: "new Instrument" });
  }
  deleteInstrument(index:number) {
     this.$data.instruments.splice(index,1);
  }

// noch extrem hässlich
getDraggedUp(srcEl:HTMLElement,dstEl:HTMLElement)
{
  let allListElements;
  if(this.$data.dragSrcEl != null && this.$data.dragSrcEl.parentNode!= null)
    allListElements = <HTMLElement[]><any>this.$data.dragSrcEl.parentNode.childNodes;
  let positionSrc:number = 0;
  let positionDst:number = 0;
  let i:number = 0;
  if(allListElements)
  allListElements.forEach(function(element:HTMLElement) {
    if(element===srcEl)
      positionSrc=i;
    if(element==dstEl)
      positionDst=i;
  i++
  });
  return (positionSrc > positionDst);
}

handleDragStart(e:DragEvent) {
  let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
  if(e.currentTarget!= null && candidateForSourceListItem != null && (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon"))
  {
    this.$data.dragSrcEl = <HTMLElement>candidateForSourceListItem;
  }
  e.dataTransfer.setData('text/html', '');
  this.dragStart();
}

handleDragOver(e:DragEvent) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.dragOver(<HTMLElement>e.currentTarget);
  return false;
}

handleDragEnter(e:DragEvent) {
  // this / e.target is the current hover target.
}

handleDragLeave(e:DragEvent) {
  this.leave(<HTMLElement>e.target);
}

handleDrop(e:DragEvent) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }
  this.dragFinished(<HTMLElement>e.target);
  return false;
}

handleDragEnd(e:DragEvent) {
  this.dragFinished(<HTMLElement>e.target);
}

handleTouchStart(e1:Event) {
  e1.preventDefault();
  let e = <TouchEvent>e1;
  let candidateForSourceListItem = (<Node>e.currentTarget).parentNode;
  if(e.currentTarget!= null && candidateForSourceListItem != null && (<HTMLElement>e.currentTarget).classList.contains("instrDragIcon"))
  {
    this.$data.dragSrcEl = <HTMLElement>candidateForSourceListItem;
  }
  this.dragStart();
    }

handleTouchEnd(e1:Event) {
  e1.preventDefault();
  let e = <TouchEvent>e1;
  console.log("end tch");
  this.dragFinished(<HTMLElement>e.target);
    }

handleTouchLeave(e1:Event) {
  e1.preventDefault();
  let e = <TouchEvent>e1;
  console.log("leave tch");
    }

handleTouchMove(e1:Event) {
  e1.preventDefault();
  // get list element:
  let e = <TouchEvent>e1;
  let currentTar:any = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  if(currentTar != null)
  {
  console.log(currentTar);
     if(currentTar.classList.contains("instrItems"))
     {
        this.dragOver(currentTar);
     }
     else
     {
       console.log("element under touch is not null, but its also no li");
     }
  }
     else
     {
       console.log("element under touch is null");
     }
    
}

dragStart()
{
  this.$data.dragDropData = this.$data.dragSrcEl.outerHTML;
  this.$data.dragSrcEl.classList.add('dragged');
}

dragOver(overEl:HTMLElement)
{
  if(this.$data.dragSrcEl != overEl)
  {    
    let dropElem:HTMLElement;

    if(this.getDraggedUp(this.$data.dragSrcEl,overEl))
    {
      if(overEl.parentNode != null)
        overEl.parentNode.removeChild(this.$data.dragSrcEl);
      var dropHTML = this.$data.dragDropData;
      overEl.insertAdjacentHTML('beforebegin',dropHTML);
      dropElem = <HTMLElement>overEl.previousSibling;
      this.addAllListeners(dropElem);
    }
    else
    {
      if(overEl.parentNode != null)
        overEl.parentNode.removeChild(this.$data.dragSrcEl);
      var dropHTML = this.$data.dragDropData;
      overEl.insertAdjacentHTML('afterend',dropHTML);
      dropElem = <HTMLElement>overEl.nextSibling;
      this.addAllListeners(dropElem);
    }
    if(dropElem != null)
    {
      this.$data.dragSrcEl = dropElem;
      this.$data.dragSrcEl.classList.add('dragged');
    }
  }
  else
  {

  }
}

dragFinished(dropEl:HTMLElement)
{
  this.$data.dragSrcEl.classList.remove('dragged');
}

leave(leftEl:HTMLElement)
{
  let isJustChildOfActive:boolean = false;
  if(leftEl.parentElement != null)
    isJustChildOfActive = leftEl.parentElement.classList.contains('dragged');
  if (typeof(leftEl.classList) != "undefined" && isJustChildOfActive)
  {
    leftEl.classList.remove('dragged');  // this / e.target is previous target element.
  }
}

addAllListeners(el:HTMLElement)
{
   el.addEventListener("dragstart", this.handleDragStart); 
   el.addEventListener("dragend", this.handleDragEnd); 
   el.addEventListener("dragover", this.handleDragOver); 
   el.addEventListener("dragleave", this.handleDragLeave); 
   el.addEventListener("drop", this.handleDrop); 
   el.addEventListener("dragenter", this.handleDragEnter); 
   el.addEventListener("touchstart", this.handleTouchStart, false); 
   el.addEventListener("touchend", this.handleTouchEnd, false); 
   el.addEventListener("touchleave", this.handleTouchLeave, false); 
   el.addEventListener("touchmove", this.handleTouchMove, false); 
}

}
</script>