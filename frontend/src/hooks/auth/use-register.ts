import { registerFormSchema, RegisterFormSchema } from "@/const/form-schema/auth"
import { signUp } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
export const useRegister = () => {
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (data: RegisterFormSchema) => {
        await signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
            callbackURL: "http://localhost:3000",
            fetchOptions: {
                onSuccess() {
                    toast.success("Registered successfuly")
                }, onError(error) {
                    console.error(error);
                    toast.success("Failed to register" + error)
                }
            }
        })
    }
    return { form, onSubmit }
}