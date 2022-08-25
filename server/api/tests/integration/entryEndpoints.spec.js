describe('entry endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return a list of all entries in database', async () => {
        const res = await request(api).get('/entries');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(33);
    }) 
    it('should increase users smoking value by 1', async () => {
        const res = await request(api)
            .patch('/entries/increase/smoking/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        const newSmokingValue = await request(api).get('/entries/smoking/tinab123');
        expect(newSmokingValue.body[0]).toEqual(9);
    });
    it('should decrease users smoking value by 1', async () => {
        const res = await request(api)
            .patch('/entries/decrease/smoking/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        const newSmokingValue = await request(api).get('/entries/smoking/tinab123');
        expect(newSmokingValue.body[0]).toEqual(7);
    });
    it('should increase users water value by 1', async () => {
        const res = await request(api)
            .patch('/entries/increase/water/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newWaterValue = await request(api).get('/entries/water/tinab123');
        expect(newWaterValue.body[0]).toEqual(9);
    });
    it('should decrease users water value by 1', async () => {
        const res = await request(api)
            .patch('/entries/decrease/water/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newWaterValue = await request(api).get('/entries/water/tinab123');
        expect(newWaterValue.body[0]).toEqual(7);
    });
    it('should set users most recent entry sleep value to true', async () => {
        const res = await request(api)
            .patch('/entries/complete/sleep/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newSleepValue = await request(api).get('/entries/sleep/tinab123');
        expect(newSleepValue.body[0]).toEqual(true);
    });
    it('should set users most recent entry sleep value to false', async () => {
        const res = await request(api)
            .patch('/entries/incomplete/sleep/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newSleepValue = await request(api).get('/entries/sleep/tinab123');
        expect(newSleepValue.body[0]).toEqual(false);
    });
    it('should set users most recent entry exercise value to true', async () => {
        const res = await request(api)
            .patch('/entries/complete/exercise/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newExerciseValue = await request(api).get('/entries/exercise/tinab123');
        expect(newExerciseValue.body[0]).toEqual(true);
    });
    it('should set users most recent entry exercise value to false', async () => {
        const res = await request(api)
            .patch('/entries/incomplete/exercise/tinab123')
            .send({
                username: 'tinab123'
            })
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("id");

        const newExerciseValue = await request(api).get('/entries/exercise/tinab123');
        expect(newExerciseValue.body[0]).toEqual(false);
    });
    it('should return a users all habit streak number', async () => {
        const res = await request(api).get('/entries/streak/all/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(2);
    })
    it('should return a users sleep habit streak number', async () => {
        const res = await request(api).get('/entries/streak/sleep/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(7);
    }) 
    it('should return a users exercise habit streak number', async () => {
        const res = await request(api).get('/entries/streak/exercise/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(3);
    }) 
    it('should return a users water habit streak number', async () => {
        const res = await request(api).get('/entries/streak/water/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(2);
    }) 
    it('should return a users smoking habit streak number', async () => {
        const res = await request(api).get('/entries/streak/smoking/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(2);
    }) 
    it('should return a users money habit streak number', async () => {
        const res = await request(api).get('/entries/streak/money/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(3);
    }) 
    it('should return last 7 users all habit completion rate', async () => {
        const res = await request(api).get('/entries/all/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([100, 100, 60, 80, 100, 80, 60]);
    })
    it('should return last 7 users exercise habit entries', async () => {
        const res = await request(api).get('/entries/exercise/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([true, true, true, false, true, true, false]);
    }) 
    it('should return last 7 smoking habit entries', async () => {
        const res = await request(api).get('/entries/smoking/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([8, 8, 10, 6, 8, 5, 7]);
    }) 
    it('should return last 7 water habit entries', async () => {
        const res = await request(api).get('/entries/water/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([8, 6, 2, 8, 8, 3, 4]);
    }) 
    it('should return last 7 money habit entries', async () => {
        const res = await request(api).get('/entries/money/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([1, 1, 1, 0, 1, 1, 1]);
    }) 
    it('should return last 7 sleep habit entries', async () => {
        const res = await request(api).get('/entries/sleep/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(7);
        expect(res.body).toEqual([true, true, true, true, true, true, true]);
    }) 
    it('should return last 28 all habit completion rate', async () => {
        const res = await request(api).get('/entries/calendar/all/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2]);
    })
    it('should return last 28 sleep habit entries', async () => {
        const res = await request(api).get('/entries/calendar/sleep/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([ 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2]);
    })
    it('should return last 28 exercise habit completion rate', async () => {
        const res = await request(api).get('/entries/calendar/exercise/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2]);
    })
    it('should return last 28 smoking habit completion rate', async () => {
        const res = await request(api).get('/entries/calendar/smoking/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2]);
    })
    it('should return last 28 money habit completion rate', async () => {
        const res = await request(api).get('/entries/calendar/money/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
    })
    it('should return last 28 water habit completion rate', async () => {
        const res = await request(api).get('/entries/calendar/water/tinab123');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(28);
        expect(res.body).toEqual([2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2]);
    })
    
})