import "reflect-metadata"
import request from "supertest"
import app from "../src/app"

describe('app.ts', () => {
    it("should send back a response with 404 status if requested with an unknown route", async() => {
        // act
        const response = await request(app).get("/");

        // expect
        expect(response.status).toBe(404);
    });

    it("should send back status of 200 from route that is defined", async() => {
        // arrange
        app.get("/test", (_, res) => res.status(200).send());

        // act
        const response = await request(app).get("/test");

        // expect
        expect(response.status).toBe(200);
    });
});