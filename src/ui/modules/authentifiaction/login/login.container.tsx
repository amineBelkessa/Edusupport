import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginView } from "./login.view"
import { LoginFormFieldsType } from "@/types/form";
import { useToggle } from "@/hooks/use-toggle";
import { firebaseSignInUser } from "@/api/authentification";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const LoginContainer = () => {
  const router = useRouter()
  const {
    value: isLoading,
    setValue: setIsLoading,
  } = useToggle();
 
  
    const {
      handleSubmit,
      formState: { errors },
      register,
      setError,
      reset,
    } = useForm<LoginFormFieldsType>();
  
    const handleSignInUser = async ({
      email,
      password,
    }: LoginFormFieldsType) => {
      const { error } = await firebaseSignInUser(email, password);
      if (error) {
        setIsLoading(false);
        toast.error(error.message);
        return;
      }
      toast.success("bienvenu sur EduSupport")
      setIsLoading(false);
      reset();
      router.push("/mon-espace");
    };
    
    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
      setIsLoading(true);
      const { password } = formData;
      if (password.length <= 5) {
        setError("password", {
          type: "manual",
          message:
            "Ton mot de passe doit comporter au minimum 6 caractères",
        });
        setIsLoading(false);
        return;
      }
      handleSignInUser(formData);
    };
    
  
    return (
      <LoginView
        form={{
          errors,
          register,
          handleSubmit,
          onSubmit,
          isLoading,
        }}
      />
    );
  };
  