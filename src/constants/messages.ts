/**
 * Response Message Constants
 */

const Messages = Object.freeze({
  // Success messages
  SUCCESS: "Operation completed successfully",
  CREATED: "Resource Created successfully",
  UPDATED: "Resource Updated successfully",
  DELETED: "Resource Deleted uccessfully",
  WRONG : "Something went wrong!",

  // Auth specific Message
  AUTH: {
    CREATED: "User Created Successfully",
    UPDATED: "User Updated Successfully",
    DELETED: "User Deleted Successfully",
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",
  },

  // Error Messages
  ERROR: {
    INTERNAL_SERVER_ERROR: "Internal server error",
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized access",
    INVALID_CREDENTIAL : "Invalid credentials",
    FORBIDDEN: "Access forbidden",
    NOT_FOUND: "Resource not found",
    VALIDATION_FAILED: "Validation faild",
    INVALID_INPUT: "Invalid input provided",
    INVALID_ID: "Invalid ID format",
    REQUEST_FAILED: "Request filde is missing",
    TO_MANY_REQUEST:
      "You have exceeded the rate limit. please try again later.",
  },
});

export default Messages;
