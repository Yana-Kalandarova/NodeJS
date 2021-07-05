export const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map(({ message }) => message);

    return JSON.stringify(errors.join('; '));
};
