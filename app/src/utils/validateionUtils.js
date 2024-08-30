

export const validateEmail = (email) => {
    let errors = {};
    if (!email) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid.';
    }
    return errors;
};
