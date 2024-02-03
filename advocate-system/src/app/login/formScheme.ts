import * as Yup from 'yup'

export interface LoginForm {
    login: string;
    password: string;
}

export const validationScheme  = Yup.object().shape({
    login: Yup.string().required("Login is required").min(1, "Login must have at least 6 characters!"),
    password: Yup.string().required('Password is required').min(1, 'Password must have at least 6 characters!')
})

export const formScheme: LoginForm = { login: '',  password: '' }