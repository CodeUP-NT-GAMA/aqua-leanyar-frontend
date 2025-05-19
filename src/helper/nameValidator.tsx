export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'This field cannot be empty.';

    return '';
};