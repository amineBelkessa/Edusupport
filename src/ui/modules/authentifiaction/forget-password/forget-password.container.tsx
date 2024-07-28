import { ForgetPasswordFormFieldsType, LoginFormFieldsType } from "@/types/form";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgetPasswordView } from "./forget-password.view"
import { useToggle } from "@/hooks/use-toggle";
import { useRouter } from "next/router";
import { sendEmailToResetPassword } from "@/api/authentification";
import { toast } from "react-toastify";

export const ForgetPasswordContainer = () =>{
  const router = useRouter()
  const {
    value: isLoading,
    setValue: setIsLoading,
  } = useToggle();
  
    const {
      handleSubmit,
      formState: { errors },
      register,
      reset,
    } = useForm<LoginFormFieldsType>();
    
    const handleResetPassword = async ({
      email,
    }: ForgetPasswordFormFieldsType) => {
      setIsLoading(true);
      const { error } = await sendEmailToResetPassword(email);
      
    
      if (error) {
        setIsLoading(false);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        return;
      }
    
      // Message générique
      toast.success("Si l'adresse e-mail est enregistrée, vous recevrez un lien de réinitialisation.");
      reset();
      router.push("/connexion");
    };
    
    
  
    const onSubmit: SubmitHandler<ForgetPasswordFormFieldsType> = async (formData) => {
      setIsLoading(true);
      handleResetPassword(formData);
    };
    return(
    <ForgetPasswordView
        form={{
            errors,
            register,
            handleSubmit,
            onSubmit,
            isLoading,
        }}
    />);
    
}