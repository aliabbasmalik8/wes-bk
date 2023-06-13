import { Repository } from 'typeorm';
import UserService from "../../src/user/user.service"
import UserRepository from "../../src/user/user.repository"
import User from '../../src/user/user.entity';
import BadRequestException from '../../src/exceptions/BadRequestException';
import NotFoundException from '../../src/exceptions/NotFoundException';

jest.mock("../../src/user/user.repository.ts")

describe("user.service.ts", () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<UserRepository>;
    const user =  { 
        id: 1, 
        firstName: "John", 
        lastName: "Berzenk", 
        email: "john@email.com", 
        password: "$2b$10$MCFUGFLNjQJC8iUrX7FgA.RjSGePRmXfVgv1OC9GxR7D6zioq8.hW", 
        createAt: new Date(), 
        updatedAt: new Date() 
    };

    beforeEach(() => {
        mockUserRepository = new UserRepository({} as Repository<User>) as any;
        userService = new UserService(mockUserRepository);
    });

    it("should return token for user on login if email and password are correct", async() => {
        // arrange
        mockUserRepository.findOneBy.mockResolvedValue(user);

        // act
        const result = await userService.login({ email: user.email, password: "tester123" });

        // expect
        expect(result).toBeDefined();
    });

    it("should raise 'BadRequestException' on login if email is incorrect", async() => {
        // arrange
        mockUserRepository.findOneBy.mockResolvedValue(null);

        // act
        try {
            await userService.login({ email: user.email, password: "wrong_password" });
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it("should raise 'BadRequestException' on login if password is incorrect", async() => {
        // arrange
        mockUserRepository.findOneBy.mockResolvedValue(user);

        // act
        try {
            await userService.login({ email: user.email, password: "wrong_password" });
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it("should throw a 'ValidationError' on login if invalid payload is sent for login", async() => {
        // arrange
        mockUserRepository.findOneBy.mockResolvedValue(user);

        // act
        try {
            await userService.login({});
        }

        // expect
        catch (error: any) {
            expect(error).toHaveProperty("name");
            expect(error.name).toEqual("ValidationError");
        }
    });

    it("should should raise 'BadRequestException' on signup if user already exists", async() => {
        // arrange
        const payload = { firstName: "John", lastName: "Berzenk", email: "john@email.com", password: "tester123" }
        mockUserRepository.findOneBy.mockResolvedValue(user);

        // act
        try {
            await userService.signup(payload)
        }

        // expect
        catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })

    it("should return token on signup if payload is valid", async() => {
        // arrange
        const payload = { firstName: "John", lastName: "Berzenk", email: "john@email.com", password: "tester123" }
        mockUserRepository.findOneBy.mockResolvedValue(null);
        mockUserRepository.create.mockReturnValue(user);

        // act
        const result = await userService.signup(payload);

        // expect
        expect(result).toBeDefined();
    });

    it("should throw a 'ValidationError' on signup if invalid payload is sent", async() => {
        // arrange
        const payload = {};

        // act
        try {
            await userService.signup(payload);
        }

        // expect
        catch (error: any) {
            expect(error).toHaveProperty("name");
            expect(error.name).toEqual("ValidationError");
        }
    });

    it("should return a user when correct id is passed", async() => {
        // arrange
        const userId = 1;
        mockUserRepository.findOneBy.mockResolvedValue(user);

        // act
        const result = await userService.getUserById(userId);

        // expect
        expect(result).toBe(user);
    });

    it("should raise 'NotFoundException' if no user is found with passed id", async() => {
        // arrange
        const userId = 1;
        mockUserRepository.findOneBy.mockResolvedValue(null);

        // act
        try {
            await userService.getUserById(userId);
        }

        // expect
        catch (error: any) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it("should raise 'BadRequestException' on updatedUser if user was not updated", async() => {
        // arrange
        const id = 1;
        mockUserRepository.update.mockResolvedValue({ affected: 0, raw: null, generatedMaps: [] });

        // act
        try {
            await userService.updateUser({}, id);
        }

        // expect
        catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it("should throw 'Validation Error' on updateUser if invalid payload is passed", async() => {
        // arrange
        const id = 1;

        // act
        try {
            await userService.updateUser({ firstName: {} }, id);
        }

        // expect
        catch (error: any) {
            expect(error).toHaveProperty("name");
            expect(error.name).toEqual("ValidationError");
        }
    });

    it("should successfully update user if valid payload is sent", async() => {
        // arrange
        const id = 1;
        const payload = { firstName: "Shelby" };
        mockUserRepository.update.mockResolvedValue({ affected: 1, raw: null, generatedMaps: [] });

        // act
        const result = await userService.updateUser(payload, id);

        // expect
        expect(result).toHaveProperty("message");
        expect(result.message).toEqual("updated successfully");
    })
});