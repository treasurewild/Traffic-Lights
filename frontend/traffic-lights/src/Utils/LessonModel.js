import createId from "./createId";
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

export default class LessonModel {

    constructor(learningObjective) {
        this.learningObjective = learningObjective;
        this._id = createId(); // Mongoose ID
        this.questions = [];
        this.shortId = uid(); // Short ID for user logins
    }
}