import Form from '@/app/ui/users/edit-form';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { userServices } from '@/services'

const services = userServices();

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const user = await services.getUserById(id);

    console.log("user: ", user);

    if (!user) {
        notFound();
    }
    
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Users', href: '/dashboard/users' },
            {
                label: 'Edit User',
                href: `/dashboard/users/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form user={user} />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Edit User',
  };