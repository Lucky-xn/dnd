/**
 * Standard response wrapper for IPC operations
 * @param {boolean} ok - Whether the operation was successful
 * @param {any} data - The data returned by the operation (only if successful)
 * @param {string|Error} error - Error message or Error object (only if failed)
 * @returns {object} Standardized response object
 */
export function createResponse(ok, data = null, error = null) {
  if (ok) {
    return { ok: true, data };
  } else {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error?.code || 'UNKNOWN_ERROR';
    return { 
      ok: false, 
      error: { 
        message: errorMessage,
        code: errorCode
      }
    };
  }
}

/**
 * Creates a validated IPC handler with standard response format
 * @param {Function} handler - The actual handler function to execute
 * @param {z.ZodSchema} [inputSchema] - Optional Zod schema to validate input
 * @returns {Function} Wrapped handler function
 */
export function createValidatedHandler(handler, inputSchema = null) {
  return async (event, payload) => {
    try {
      // Validate input if schema provided
      let validatedPayload = payload;
      if (inputSchema) {
        try {
          validatedPayload = inputSchema.parse(payload);
        } catch (validationError) {
          return createResponse(false, null, `Validation error: ${validationError.message}`);
        }
      }

      // Execute the handler
      const result = await handler(validatedPayload);
      
      // Return success response
      return createResponse(true, result);
    } catch (error) {
      console.error('IPC Handler Error:', error);
      return createResponse(false, null, error);
    }
  };
}

/**
 * Handles batch operations by normalizing input to array and processing each item
 * @param {Function} singleItemHandler - Handler for processing a single item
 * @param {Object} itemSchema - Schema for validating each item
 * @returns {Function} Batch handler function
 */
export function createBatchHandler(singleItemHandler, itemSchema) {
  return async (items) => {
    // Normalize to array
    const itemsArray = Array.isArray(items) ? items : [items];
    
    // Validate each item
    const validatedItems = itemsArray.map((item, index) => {
      try {
        return itemSchema.parse(item);
      } catch (validationError) {
        throw new Error(`Item ${index}: ${validationError.message}`);
      }
    });

    // Process each item
    const results = [];
    for (const item of validatedItems) {
      const result = await singleItemHandler(item);
      results.push(result);
    }

    return results;
  };
}

/**
 * Creates error objects with consistent structure
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {any} [details] - Additional error details
 * @returns {Error} Error object with code property
 */
export function createError(code, message, details = null) {
  const error = new Error(message);
  error.code = code;
  if (details) {
    error.details = details;
  }
  return error;
}