import QuestionModel from "../../Utils/QuestionModel";

test('should create expected Lesson object', () => {

    const text = 'Test Question';

    const testQuestion = new QuestionModel(text);

    expect(testQuestion.text).toBe(text);
    expect(testQuestion.shortId.length).toBe(6);
    expect(testQuestion).toBeInstanceOf(QuestionModel);

})