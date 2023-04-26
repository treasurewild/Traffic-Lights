import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

export default class QuestionModel {

    constructor(text) {
        this.text = text;
        this.shortId = uid(); // Short ID to aid Mongo Insert
    }
}