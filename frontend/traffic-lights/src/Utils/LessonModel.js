import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({
    dictionary: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    length: 6
});

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