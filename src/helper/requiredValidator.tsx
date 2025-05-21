export function requiredValidator(password: string) {
    if (!password) return "Please fill in this field."
    return ''
}