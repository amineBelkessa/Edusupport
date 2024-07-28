import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterView } from "./register.view";
import { RegisterFormFieldsType } from "@/types/form";
import { useState } from "react";
import { firebaseCreateUser, sendEmailVerificationProcedure } from "@/api/authentification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToggle } from "@/hooks/use-toggle";
import { firestoreCreateDocument} from "@/api/firestore";


export const RegisterContainer = () => {
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
  } = useForm<RegisterFormFieldsType>();

  const handleCreateUserDocument = async (
    collectionName: string,
    documentID: string,
    document: object
  ) => {
    const { error } = await firestoreCreateDocument(
      collectionName,
      documentID,
      document
    );
  
    if (error) {
      toast.error(error.message);
      return;
    }
    
    toast.success("bienvenu sur EduSupport");
    setIsLoading(false);
    reset();
    sendEmailVerificationProcedure();
  };
  

  const handleCreateUserAuthentication = async ({
    email,
    password,
    how_did_hear,
  }: RegisterFormFieldsType ) => {
    const { error, data } = await firebaseCreateUser(email, password);
    if (error){
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
    const userDocumentData = {
      email: email,
      how_did_hear,
      uid: data.uid,
      creation_date: new Date(),
    };
    
    handleCreateUserDocument("users", data.uid, userDocumentData);
    

  };
  
  const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
    setIsLoading(true);
    console.log('formData', formData);
    const {password} = formData;
    if (password.length <= 5) {
      setError("password", {
        type: "manual",
        message:
          "Ton mot de passe doit comporter au minimum 6 caractères",
      });
  return;
}

handleCreateUserAuthentication(formData)


   
  };
  
  return (
    <RegisterView
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
