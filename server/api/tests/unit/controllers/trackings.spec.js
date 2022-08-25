const trackingsController = require('../../../controllers/tracks')
const Tracking = require('../../../models/track');
const jwt = require("jsonwebtoken");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('trackings controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('get all trackings', () => {
        test('it returns users with a 200 status code', async () => {
            let testTracking = ['1', '2']
            jest.spyOn(Tracking, 'all', 'get')
                 .mockResolvedValue(testTracking);
            await trackingsController.getAllTracking(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testTracking);
        })
    });
    // describe('get trackings for user', () => {
    //     test('it returns users with a 200 status code', async () => {
    //         let testTracking = ['t1', 't2']
    //         jest.spyOn(Tracking, 'all', 'get')
    //              .mockResolvedValue(testTracking);
    //         await trackingsController.getAllTracking(null, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(testTracking);
    //     })
    // });


    // test for getUserTrackingsByUserId

    describe("show by user_id", () => {
        test("it returns a tracking with a 200 status code", async () => {
          let testTracking = {
              user_id: 1, sleep_track: true, sleep_goal: 8,exercise_track: true, exercise_goal: 4, exercise_freq: 'week', water_track: true, water_goal: 6, smoking_track: true, smoking_goal: 8, money_track: true, money_goal: 4, money_begin_date: '2022-06-06', money_end_date: '2022-07-06'
          };
          jest
            .spyOn(Tracking, "getUserTrackingsByUserId")
            .mockResolvedValue(new Tracking(testTracking));
    
          const mockReq = { params: { user_id: 1 } };
          await trackingsController.getUserTrackingsByUserId(mockReq, mockRes);
          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith(new Habit(testTracking));
        });
      });




    // describe('show', () => {
    //     test('it returns a dog with a 200 status code', async () => {
    //         let testDog = {
    //             id: 1, name: 'Test Dog', age: 2
    //         }
    //         jest.spyOn(Dog, 'findById')
    //             .mockResolvedValue(new Dog(testDog));
                
    //         const mockReq = { params: { id: 1 } }
    //         await dogsController.show(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(new Dog(testDog));
    //     })
    // });

    // describe('create', () => {
    //     test('it returns a new dog with a 201 status code', async () => {
    //         let testDog = {
    //             id: 1, name: 'Test Dog', age: 2
    //         }
    //         jest.spyOn(Dog, 'create')
    //             .mockResolvedValue(new Dog(testDog));
                
    //         const mockReq = { body: testDog }
    //         await dogsController.create(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(201);
    //         expect(mockJson).toHaveBeenCalledWith(new Dog(testDog));
    //     })
    // });

    // describe('destroy', () => {
    //     test('it returns a 204 status code on successful deletion', async () => {
    //         jest.spyOn(Dog.prototype, 'destroy')
    //             .mockResolvedValue('Deleted');
            
    //         const mockReq = { params: { id: 1 } }
    //         await dogsController.destroy(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(204);
    //     })
    // });
    
})
