export function passwordValidator(password: string) {
    if (!password) return "Please fill in this field."
    if (password.length < 5) return 'Password should contain at least 5 characters.'
    return ''
}