export function emailValidator(email: string) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!email) return "Please fill in this field."
    if (!re.test(email)) return 'Please enter a valid email address!'
    return ''
}