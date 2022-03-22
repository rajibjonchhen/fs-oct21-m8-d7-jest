import supertest from "supertest"
import { app } from "../app.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

console.log(process.env.MONGO_URL)

const client = supertest(app)

describe("Testing the testing environment", () => {
    test("should check that true is true", () => {
        expect(true).toBe(true)
    }) // it is an alias for test.
    test("should check that 1 + 1 is 2", () => {
        expect(1 + 1).toBe(2)
    }) // it is an alias for test.
})

describe("Testing the endpoints", () => {

    beforeAll(async () => {
        console.log("Before all tests...")
        await mongoose.connect(process.env.MONGO_URL)

        console.log("Connected to Mongo")
    })


    it("should test that the test endpoint returns a success message", async () => {
        const response = await client.get("/test")
        expect(response.body.message).toBe("Test success")
    })

    const validProduct = {
        name: "11 Test product",
        price: 900
    }

    it("should test that the POST /products endpoint returns the newly created product", async () => {
        const response = await client.post("/products").send(validProduct)
        console.log(response.data)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        console.log(response.body)
    })

    const invalidData = {
        whatever: 'something'
    }

    it("should test that POST /products with INVALID data returns 400", async () => {
        const response = await client.post("/products").send(invalidData)
        expect(response.status).toBe(400)
    })

    let createdProductId
    it("should test that the GET /products endpoint returns the product we just created", async () => {
        const response = await client.get("/products")
        console.log("get all products", response)
        expect(response.status).toBe(200)
        // expect(response.body.length).toBe(1)

        createdProductId = response.body[0]._id
    })

    it("should test that the get /products/id endpoint returns the 201", async() => {
        const response = await client.get("/products/6239e3da48319babb487ac1e")
        console.log("response get products/6239e3da48319babb487ac1e",response)
        expect(response.status).toBe(201)
    })

    it("should test that the get /products/wrongId endpoint returns the 404", async() => {
        const response = await client.get("/products/wrongId")
        console.log("response get products/6239e3da48319babb487ac1e",response)
        expect(response.status).toBe(404)
    })

    const updateProduct = {
        name : "11 product name changed",
        price : "1000"
    }

    it("should test that the put /products endpoint returns the 204", async() => {
        const response = await (await client.put("/products/6239e3da48319babb487ac1e")).send(updateProduct)
        console.log("products/6239e3da48319babb487ac1e -", response)
        expect(response.status).toBe(204)
    })
    
    it("should test that the put /products/wrongId endpoint returns the 404", async() => {
        const response = await (await client.put("/products/wrongId")).send(updateProduct)
        console.log("/products/wrongId -", response)
        expect(response.status).toBe(404)
    })


    it("should test that the delete /products endpoint returns the 204", async() => {
        const response = await client.delete("/products/6239e3da48319babb487ac1e")
        expect(response.status).toBe(204)
    })

    it("should test that the delete /products/wrongId endpoint returns the 404", async() => {
        const response = await client.delete("/products/3w45r45o556ngI4d")
        expect(response.status).toBe(404)
    })




    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()

        console.log("Closed Mongo connection.")
    })


})

