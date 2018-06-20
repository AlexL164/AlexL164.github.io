export default class DataInstrumentList {
  _ids: number[];
  _names: String[];

  constructor() {
    this._ids = [2];
    this._names = ["f"];
  }

  addInstrument(position:number, id: number, name: String) {
    this._ids.splice(position, 0, id);
    this._names.splice(position, 0, name);
  }

  appendInstrument(id: number, name: String) {
    this._ids.push(id);
    this._names.push(name);
  }

  deleteInstrumentByIndex(index: number) {
    this._ids.splice(index, 1);
    this._names.splice(index, 1);
  }

  deleteInstrumentById(id: String) {
    this._ids.splice(this.idToIndex(id), 1);
    this._names.splice(this.idToIndex(id), 1);
  }

  // ids[] and names[] to {id,name}[]
  getInstrumentsAsArrayOfObjects() {
    let togetherArr:Object[] = new Array();
    let ids = this.getIds();
    let names = this.getNames();
    this.getIds().forEach(function(element: any, index: any) {
        let obj = {id: ids[index], name: names[index]};
        togetherArr.push (obj);
      });
    return togetherArr;
  }

  getIds():number[] {
    return this._ids;
  }

  getNames():String[] {
    return this._names;
  }

  getLength()
  {
    return this._ids.length;
  }

  // ugly, redundant and not checking if numbers equal
  swapInstrumentsById(idSrc: string, idDst: string) {
    let indexSrc: number = this.idToIndex(idSrc);
    let indexDst: number = this.idToIndex(idDst);
    var lowerIndex = indexSrc < indexDst ? indexSrc : indexDst;
    var higherIndex = indexSrc > indexDst ? indexSrc : indexDst;

    var tempId1 = this.getIds()[higherIndex];
    var tempName1 = this.getNames()[higherIndex];
    var tempId2 = this.getIds()[lowerIndex];
    var tempName2 = this.getNames()[lowerIndex];
    
    if (lowerIndex < higherIndex) {
      this.deleteInstrumentByIndex(lowerIndex);
      this.deleteInstrumentByIndex(higherIndex -1);
      this.addInstrument(lowerIndex, tempId1, tempName1);
      this.addInstrument(higherIndex, tempId2, tempName2);
    } else {
    }
  }

  idToIndex(id: any) {
    let calcedIndex = -1;
    this.getIds().forEach(function(element: number, index: any) {
      if (element == id) 
        calcedIndex = index;
    });
    return calcedIndex;
  }
}
