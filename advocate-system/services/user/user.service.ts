import { auth, signOut } from '@/auth';
import { ApiResponse, User, UserList } from '@/resources/'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an user status.',
    }),
    date: z.string(),
});

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
 };

class UserServices{
    UpdateUser = FormSchema.omit({ id: true, date: true });
    baseUrl: string = 'http://localhost:8082/v1/user';

    async  fetchFilteredUsers(
        query: string,
        currentPage: number,
    ) : Promise<ApiResponse<UserList>> {

      const session = await auth();
      
      const response = await fetch(`${this.baseUrl}?query=${encodeURIComponent(query)}&page=0&size=2&sort=login,asc`, {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}`
        }
      });
      
      if (!response.ok) {
          console.log(":::::response.status:", response.status);
          //return new UserList() as ApiResponse<UserList>;
      }
        
        
        const data = await response.json();
        
        return data;  
    }
    
    async  getUserById(userId: string) : Promise<User> {
        const session = await auth();
        
        const response = await fetch(`${this.baseUrl}/${userId}` , {
            method:'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.accessToken}`
            }
        });
        
        if(!response.ok){
            console.log(":::::Erro ao obter usuários por ID: ", response.status);
        }

        return (await response.json());
    }

    async createNewUser(user: User):Promise<string>{
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        const response = await fetch(this.baseUrl,requestOptions);

        if(!response.ok) throw   new Error("HTTP error!");
        else return 'Usuario criado com sucesso!'
    }

    async updateUser(id: string, prevState: State, formData: FormData) {
        const validatedFields = this.UpdateUser.safeParse({
          customerId: formData.get('customerId'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        });
      
        if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
          };
        }
        
        const { customerId, amount, status } = validatedFields.data;
        const amountInCents = amount * 100;
       
        try {
            this.getUserById("");
        } catch (error) {
          return { message: 'Database Error: Failed to Update User.' };
        }
       
        revalidatePath('/dashboard/users');
        redirect('/dashboard/users');
      }
}

export const userServices = () => new UserServices();