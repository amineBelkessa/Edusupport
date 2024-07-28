import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Typography } from "@/ui/design-system/typography/typography";
import { register } from "module";
import { Container } from "@/ui/components/container/container";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { ProfileStepForm } from "../profile-step/profile-step-form";
import { UploadAvatar } from "@/ui/components/upload-avatar/upload-avatar";
import { useState } from "react";
import { storage } from "@/config/firebase-config";
import { StorageReference, UploadTask, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { firestoreUpdateDocument } from "@/api/firestore";

export const AvatarStep = ({
    prev,
    next,
    isFinalStep,
    stepsList,
    getCurrentStep,
  }: BaseComponentProps) => {
    const{authUser}=useAuth();

    const {value:isLoading, toggle } = useToggle();
    const[selectedImage,setSelectedImage] = useState<File | null>(null);
    const[imagePreview,setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const[uploadProgress,setUploadProgress] = useState<number>(0);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
          
            const reader = new FileReader();
            reader.onload = (e) => {
              let imgDataUrl: string | ArrayBuffer | null = null;
              if (e.target) {
                imgDataUrl = e.target.result;
              }
              setImagePreview(imgDataUrl);
            };
            reader.readAsDataURL(file);
          }
          
      };

      const updateUserDocument = async (photoURL: string) => {
        const body = {
          photoURL: photoURL
        };
    
      
        const { error } = await firestoreUpdateDocument(
          "users",
          authUser.uid,
          body
        );
      
        if (error) {
          toggle();
          toast.error(error.message);
          return;
        }
      
        toggle();
        next();
      };
      
    const handleImageUpload = () => {
        let storageRef: StorageReference;
        let uploadTask: UploadTask;
      
        if (selectedImage !== null) {
            toggle();
          storageRef = ref(
            storage,
            `users-medias/${authUser.uid}/avatar/avatar-${authUser.uid}`
          );
          uploadTask = uploadBytesResumable(storageRef, selectedImage);
      
          uploadTask.on(
            "state_changed", (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
                toggle();
                toast.error("Une erreur inconnue est survenue");
              },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      //console.log(":: downloadURL :: ", downloadURL);
                      updateUserDocument(downloadURL);
                    }
                  );
                  
            }
              
          );
        } else{
            next()
        }
      };
      
      
    return(
        <div className="relative h-screen pb-[91px]">
        <div className="h-full overflow-auto">
       <Container className="grid h-full grid-cols-12">
         <div className="relative z-10 flex items-center h-full col-span-6 py-10">
           <div className="w-full space-y-5 pb-4.5">
             <OnboardingTabs
             tabs={stepsList}
             getCurrentStep={getCurrentStep}
             />
             <Typography variant="h1" component="h1">
             Dèrnière étape !
             </Typography>
             <Typography
               variant="body-base"
               component="p"
               theme="gray"
             >
               Bienvenue sur EduSupport, l&apos;endroit où les étudiants viennent pour décompresser et trouver du soutien. Pour commencer, n&apos;oublie pas de mettre une photo de profil sympa, un sourire engageant peut faire toute la différence ! On promet, ici personne ne juge le nombre de tasses de café que tu as consommées pour tenir le coup. Rejoins-nous et partage un peu de ta personnalité avec notre communauté bienveillante !
             </Typography>
           </div>
         </div>
         <div className="flex items-center h-full col-span-6">
          <div className="flex justify-center w-full mr-60">
         <UploadAvatar handleImageSelect={handleImageSelect}
         imagePreview={imagePreview}
         uploadProgress={uploadProgress}
         isLoading={isLoading}
         />
          </div>

         </div>

       </Container>
     </div>
     <OnboardingFooter
       prev={prev}
       next={handleImageUpload}
       isFinalStep={isFinalStep}
       isLoading={isLoading}
     />
   </div>
    );
  }