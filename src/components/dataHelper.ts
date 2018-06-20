import DataInstrumentList from "./DataInstrumentList";

export default class DataHelper {
    _instrumentList: DataInstrumentList;

    constructor() {
        this._instrumentList = new DataInstrumentList();
    }

    get instrumentList()
    {
        return this._instrumentList;
    }
}
