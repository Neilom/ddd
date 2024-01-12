import e from "express";
import Notification from "./notification";

describe("Unit test for notification", () => {
  it("should create erros", () => {
    const notifications = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notifications.addError(error);

    expect(notifications.messages("customer")).toBe("customer: error message");

    const error2 = {
      message: "error2 message",
      context: "customer",
    };

    notifications.addError(error2);
    expect(notifications.messages("customer")).toBe(
      "customer: error message, customer: error2 message"
    );

    const error3 = {
      message: "error2 message 3",
      context: "order",
    };

    notifications.addError(error3);
    expect(notifications.messages("customer")).toBe(
      "customer: error message, customer: error2 message"
    );

    expect(notifications.messages()).toBe(
      "customer: error message, customer: error2 message, order: error2 message 3"
    );
  });

  it("should check if has errors", () => {
    const notifications = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notifications.addError(error);

    expect(notifications.hasErrors()).toBeTruthy();
  });

  it("should get all errors props", () => {
    const notifications = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notifications.addError(error);

    expect(notifications.getErrors()).toEqual([error]);
  })
});
