const validateEmail = (email) => {

    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const validatePassword = (password) =>{

    return String(password).length >= 8

}
const validateForm = (user) =>{

    const {email, password} = user

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    return isEmailValid && isPasswordValid
}

export default {
    validateForm
}