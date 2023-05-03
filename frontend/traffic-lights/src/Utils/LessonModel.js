import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

export default class LessonModel {

    constructor(learningObjective, classCode, level, subject, teacher) {
        this.learningObjective = learningObjective;
        this.classCode = classCode;
        this.level = level;
        this.subject = subject;
        this.questions = [];
        this.shortId = uid(); // Short ID for user logins
        this.teacher = teacher;
    }
}