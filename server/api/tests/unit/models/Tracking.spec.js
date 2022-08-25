const Entry = require('../../../models/entry');
const User = require('../../../models/user');
const Tracking = require('../../../models/track');

jest.mock('../../../models/user');
jest.mock('../../../models/entry');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Tracking', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with trackings on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Tracking.all;
            expect(all).toHaveLength(3)
        })
    });

          //  test to findTrackingByUsername

          describe('findTrackingByUsername', () => {
            test('tracking to be an instance of an Array on successful db query', async () => {
                let trackingData = {
                    sleep_track: true, sleep_goal: 8,exercise_track: true, exercise_goal: 4, exercise_freq: 'week', water_track: true, water_goal: 6, smoking_track: true, smoking_goal: 8, money_track: true, money_goal: 4, money_begin_date: '2022-06-06', money_end_date: '2022-07-06'
                }
                jest.spyOn(db, 'query')
                    .mockResolvedValueOnce({ rows: [trackingData] });
                const result = await Tracking.findTrackingByUsername(1);
                expect(result).toBeInstanceOf(Array)
            })
    
        });
    
        // test to findTrackingByUserId
    
        describe('findTrackingByUserId', () => {
            test('it resolves with a Tracking on successful db query', async () => {
                let trackingData = {
                  sleep_track: true, sleep_goal: 8,exercise_track: true, exercise_goal: 4, exercise_freq: 'week', water_track: true, water_goal: 6, smoking_track: true, smoking_goal: 8, money_track: true, money_goal: 4, money_begin_date: '2022-06-06', money_end_date: '2022-07-06'
                }
                jest.spyOn(db, 'query')
                    .mockResolvedValueOnce({ rows: [trackingData] });
                const result = await Tracking.findTrackingByUserId(1);
                expect(result).toBeInstanceOf(Tracking)
    
            })
        });

    // describe('findById', () => {
    //     test('it resolves with dog on successful db query', async () => {
    //         let dogData = { id: 1, name: 'Test Dog' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({rows: [ dogData] });
    //         const result = await Dog.findById(1);
    //         expect(result).toBeInstanceOf(Dog)
    //     })
    // });

    // describe('create', () => {
    //     test('it resolves with dog on successful db query', async () => {
    //         let dogData = { name: 'Test Dog', age: 3 }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({rows: [ { ...dogData, id: 1 }] });
    //         const result = await Dog.create(dogData);
    //         expect(result).toHaveProperty('id')
    //     })
    // });
    
    
})
