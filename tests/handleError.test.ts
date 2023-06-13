import handleError from '../src/handleError';
import { Request, Response, NextFunction } from 'express';

describe('handleError.ts', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback function if no error occurs', async () => {
    const callback = jest.fn().mockResolvedValueOnce(undefined);

    await handleError(callback)(req, res, next);

    expect(callback).toHaveBeenCalledWith(req, res, next);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return 400 status with the first validation error if a ValidationError occurs', async () => {
    const validationError = {
      name: 'ValidationError',
      errors: ['Invalid input'],
    };

    const callback = jest.fn().mockRejectedValueOnce(validationError);

    await handleError(callback)(req, res, next);

    expect(callback).toHaveBeenCalledWith(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: 'Invalid input' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 status with an error message if an internal server error occurs', async () => {
    const internalServerError = new Error('Internal Server Error');

    const callback = jest.fn().mockRejectedValueOnce(internalServerError);

    await handleError(callback)(req, res, next);

    expect(callback).toHaveBeenCalledWith(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(next).not.toHaveBeenCalled();
  });
});
