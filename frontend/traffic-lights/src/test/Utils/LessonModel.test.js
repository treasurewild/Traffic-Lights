import LessonModel from "../../Utils/LessonModel";

test('should create expected Lesson object', () => {

    const [learningObjective, classCode, level, subject, teacher] = [`Test Objective`, `Test Class`, '7', 'Test Subject', 'Mrs Test'];

    const testLesson = new LessonModel(learningObjective, classCode, level, subject, teacher);

    expect(testLesson.learningObjective).toBe(learningObjective);
    expect(testLesson.classCode).toBe(classCode);
    expect(testLesson.level).toBe(level);
    expect(testLesson.subject).toBe(subject);
    expect(testLesson.teacher).toBe(teacher);
    expect(testLesson.shortId.length).toBe(6);
    expect(testLesson).toBeInstanceOf(LessonModel);

})