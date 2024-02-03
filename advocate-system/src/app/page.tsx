'use client'
import { Template, AuthenticatedPage } from '@/components';

export default function Home(){
    return (
        <AuthenticatedPage>
            <Template>
                home
            </Template>
        </AuthenticatedPage>
    )
}