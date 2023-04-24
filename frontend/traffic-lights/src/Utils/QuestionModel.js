import createId from "./createId";

export default class QuestionModel {
    constructor(text) {
        this.text = text;
        this._id = createId();
        this.responses = [];
    }
}