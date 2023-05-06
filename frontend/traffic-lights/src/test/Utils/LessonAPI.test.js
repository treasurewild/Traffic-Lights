import axiosMock from 'axios';
import * as api from '../../Utils/lessonAPI'
import { mockLessonsLarge } from '../mockLessons';

jest.mock('axios');

describe('Lesson API Tests', () => {
    describe('getLessons tests normal return', () => {
        let functionResult;
        const mockTeacherId = '111111111111111t'

        const expectedReturn = { lessons: mockLessonsLarge, status: 200 };
        const resolvedRequestWithData = { data: mockLessonsLarge, status: 200 };

        beforeEach(async () => {
            axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
            functionResult = await api.getLessons(mockTeacherId);
        });

        test('should make a get request via axios', () => {
            expect(axiosMock.get).toHaveBeenCalledTimes(1);
            expect(axiosMock.get).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/teacher/lessons/${mockTeacherId}`);
        });

        test('should return mock lesson data when valid data is returned from server', () => {
            expect(functionResult).toStrictEqual(expectedReturn);
        });
    });

    // describe('getLesson tests normal return', () => {
    //     let functionResult;
    //     const mockLessonId = '111111111111111l'

    //     const expectedReturn = { lesson: mockLessonsLarge[0], status: 200 };
    //     const resolvedRequestWithData = { data: mockLessonsLarge[0], status: 200 };
    //     const expectedError = { status: 204, lesson: {} }

    //     beforeEach(async () => {
    //         axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
    //         functionResult = await api.getLesson(mockLessonId);
    //     });

    //     test('should make a get request via axios', () => {
    //         expect(axiosMock.get).toHaveBeenCalledTimes(1);
    //         expect(axiosMock.get).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/teacher/lesson/${mockLessonId}`);
    //     });

    //     test('should return mock lesson data when valid data is returned from server', () => {
    //         expect(functionResult).toStrictEqual(expectedReturn);
    //     });

    //     test('should return message when no lesson', async () => {
    //         const errorResult = await api.getLesson('123456');
    //         expect(errorResult).toStrictEqual(expectedError);
    //     });
    // });

    // Need to research how to test this
    // describe('New Lesson tests', () => {
    //     const testLesson = {
    //         learningObjective: '',
    //         classCode: '',
    //         level: '',
    //         subject: '',
    //         teacher: '111111'
    //     };

    //     const expectedReturn = { lesson: mockLessonsLarge[0], status: 200 };
    //     const resolvedRequestWithData = { data: tes, status: 200 };
    //     const expectedError = { status: 204, lesson: {} }


    //     beforeEach(async () => {
    //         axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
    //         functionResult = await api.newLesson(testLesson);
    //     });

    //     test('should first', () => { second })
    // })
});