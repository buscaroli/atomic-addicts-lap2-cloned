const Entry = require('../../../models/entry');
const User = require('../../../models/user');
const Tracking = require('../../../models/track');

jest.mock('../../../models/user');
jest.mock('../../../models/track');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Entry', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with entries on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Entry.all;
            expect(all).toHaveLength(33)
        })
    });


// test to findByUserID

describe('findByUserId', () => {
    test('entry to be an instance of an Array on successful db query', async () => {
        let entryData = {
            sleep_entry: true, exercise_entry: true, water_entry: 8, smoking_entry: 8, money_entry: 1, date_entry: '2022-06-06'
        }
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [entryData] });
        const result = await Entry.findByUserId(1);
        expect(result).toBeInstanceOf(Array)
    })

});


// test  CREATE 

describe("create", () => {
    test("it resolves with entry on successful db query", async () => {
      let entryData = { id: 1, name: "New Entry" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [entryData] });
      const result = await Entry.create("New Entry");
      expect(result).toBeInstanceOf(Entry);
    });
  });



// test to delete 

describe('deleteEntry', () => {
    test('it resolves with updated entry on successful db query', async () => {
        let testEntry = new Entry({
            sleep_entry: true, exercise_entry: true, water_entry: 8, smoking_entry: 8, money_entry: 1, date_entry: '2022-06-06'
        });
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...testEntry }] });
        const result = await testEntry.del();
        expect(result).toBe('The habit has been deleted')
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
