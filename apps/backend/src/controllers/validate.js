export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailPattern.test(email)
}

export const validatePassword = (password) => {
    const minLength = /^.{8,}$/
    const uppercase = /(?=.*[A-Z])/
    const lowercase = /(?=.*[a-z])/
    const digit = /(?=.*\d)/
    const specialCharacter = /(?=.*[@$!%*?&])/
    const messages = []

    if(!minLength.test(password)) messages.push('Password must contain at least 8 characters.')

    if(!uppercase.test(password)) messages.push('Password must contain at least one uppercase letter.')

    if(!lowercase.test(password)) messages.push('Password must contain at least one uppercase letter.')

    if(!digit.test(password)) messages.push('Password must contain at least one digit.')

    if(!specialCharacter.test(password)) messages.push('Password must contain at least one special character.')

    return {
        isValid: messages.length === 0,
        messages
    }

}