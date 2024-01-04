import request from "supertest"
import express, {Request, Response} from "express"
import { userLogin } from "../services/user.service"

const app = express();
app.post("/login", userLogin); 

function mockCreateUser() {

}

describe("POST /userLogin", () => {
    describe("Given a email address and password", () => {
        test("should respond with a 200 status code", async() => {
            const response = await request(app)
                .post("/login")
                .send({
                emailAddress: "emailAddress",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })

        test("should specify json in the content type header", async() => {
            const response = await request(app)
                .post("/login")
                .send({
                emailAddress: "emailAddress",
                password: "password"
            })
            expect(response.header['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("When the email address and password are missing", () => {
        test("should respond a message in a json object", async() => {
            const bodyData = [
                {emailAddress: "emailAddress"},
                {password: "password"},
                {}
            ]
            for (const body of bodyData) {
                const response = await request(app).post("/login").send(body)
                expect(response.body).toEqual({ error: {} })
            }
        })
    })
})