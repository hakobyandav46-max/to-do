
import { LoginFormSchema, loginFormSchema } from "@/const/form-schema/auth";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: LoginFormSchema) => {
        await signIn.email({
            email: data.email,
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
};