import envConfig from "../../src/start/envConfig"

describe('envConfig.ts', () => {
    it("should get undefiend when reading env variable", () => {
        // arrange
        const target = process.env.EXISTS;

        // expect
        expect(target).toBeUndefined();
    });

    it("should get defined value when reading env variable after configuration", () => {
        // arrange
        envConfig();

        console.log('===>    process.env.EXISTS',  process.env.EXISTS)
        
        // act
        const target = process.env.EXISTS;

        // expect
        expect(target).toBeDefined();
    });
});