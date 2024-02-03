'use client'

import { Template, InputText, Button, FieldError } from '@/components'
import { useState } from 'react'
import { LoginForm, formScheme, validationScheme } from './formScheme'
import { useFormik } from 'formik'
import { userAuth } from '@/services'
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials } from '@/resources/'
import { useNotification } from '@/components/'
export default function LoginPage(){

    const [loading, setLoading] = useState<boolean>(false);
    const auth = userAuth();
    const router = useRouter();
    const notification = useNotification();

    const { values, handleChange, handleSubmit, errors } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm){
        const credentials: Credentials = { login: values.login, password: values.password }
        try{
            const accessToken: AccessToken = await auth.authenticate(credentials);
            auth.initSession(accessToken);
            router.push("/")
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error" );
        }
    }

    return (
        <Template loading={loading}>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-1x1 font-bold leading-9 tracking-tight'>Login to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium leading-6'>Login</label>
                        </div>
                        <div className='mt-2'>
                            <InputText style='w-full'
                                        id='login'
                                        value={values.login}
                                        onChange={handleChange}/>
                            <FieldError error={errors.login}/>
                        </div>
                        <div>
                            <label className='block text-sm font-medium leading-6'>Password</label>
                        </div>
                        <div className='mt-2'>
                            <InputText type='password' style='w-full'
                                        id='password'
                                        value={values.password}
                                        onChange={handleChange}/>
                            <FieldError error={errors.password}/>
                        </div>
                        <div>
                            <Button type='submit' style='bg-green-700 hover:bg-green-900' label='Login'/>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}