describe('tracking endpoints', () => {
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

    it('should return a list of all trackings in database', async () => {
        const res = await request(api).get('/trackings');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })
    it('should get users tracking preferences', async () => {
        const res = await request(api)
            .get('/trackings/username')
            .send({headers: {
                authorization: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbmFiMTIzIiwiZW1haWwiOiJ0aW5hYjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2NTQ3MzE1NjgsImV4cCI6MTY1NDczMTYyOH0.w6_ctLYfSNFmx1pYiOAkruJgns6omywVPpGcOisRTCU"
                }
            }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });
})