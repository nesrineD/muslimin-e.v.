import { debounce } from "./utils";

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("delays function execution", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(99);
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("resets delay on subsequent calls", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    jest.advanceTimersByTime(50);
    
    debouncedFunc(); // This should reset the timer
    jest.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("passes arguments correctly", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc("arg1", "arg2", 123);
    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith("arg1", "arg2", 123);
  });

  it("preserves this context", () => {
    const obj = {
      value: 42,
      method: jest.fn(function (this: { value: number }) {
        return this.value;
      }),
    };

    const debouncedMethod = debounce(obj.method, 100);
    debouncedMethod.call(obj);
    
    jest.advanceTimersByTime(100);
    expect(obj.method).toHaveBeenCalled();
  });

  it("cancels pending execution", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    jest.advanceTimersByTime(50);
    
    debouncedFunc.cancel();
    jest.advanceTimersByTime(100);
    
    expect(func).not.toHaveBeenCalled();
  });

  it("can be called multiple times after cancellation", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc.cancel();
    
    debouncedFunc();
    jest.advanceTimersByTime(100);
    
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("handles multiple rapid calls correctly", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    // Simulate rapid scroll events
    for (let i = 0; i < 10; i++) {
      debouncedFunc(i);
      jest.advanceTimersByTime(10);
    }

    // Still shouldn't have called yet
    expect(func).not.toHaveBeenCalled();

    // After the debounce delay from the last call
    jest.advanceTimersByTime(100);
    
    // Should only be called once with the last value
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(9);
  });
});
