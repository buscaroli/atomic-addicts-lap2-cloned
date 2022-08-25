const usersController = require('../../../controllers/users')
const User = require('../../../models/user');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('get all', () => {
        test('it returns all users with a 200 status code', async () => {
            let testUsers = ['d1', 'd2']
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(testUsers);
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUsers);
        })
    });

    //show getById


    describe("show getById", () => {
        test("it returns a user with a 200 status code", async () => {
          let testUser = {
            id: 1,
            username: "Test user",
            password_digest: "testPassword",
            email: "test@test.com"
            
          };
          jest.spyOn(User, "getById").mockResolvedValue(new User(testUser));
    
          const mockReq = { params: { id: 1 } };
          await usersController.show(mockReq, mockRes);
          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith(new User(testUser));
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
