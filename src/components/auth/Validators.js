import {
    notBlank,
    validEmail,
    passwordLength,
    validPasswordConfirmation
} from '../Shared/Validators'

export const validateLogin = ({ blank }) => values =>
    notBlank(values, ['username', 'password'], blank)

export const validateRegister = ({
        blank,
        invalid_email,
        short_password,
        password_mismatch,
    }) => values =>
    ({ ...notBlank(values, ['username', 'email', 'password1', 'password2'], blank),
        ...validEmail(values, 'email', invalid_email),
        ...passwordLength(values, 'password1', short_password),
        ...validPasswordConfirmation(values, 'password1', 'password2', password_mismatch)
    })

// export const validateRegister = values => notBlank(values, ['username', 'password'])