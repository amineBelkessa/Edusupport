import { useAuth } from "@/context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Typography } from "@/ui/design-system/typography/typography";
import { register } from "module";
import { Container } from "@/ui/components/container/container";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { ProfileStepForm } from "../profile-step/profile-step-form";
import { Logo } from "@/ui/design-system/logo/logo";
import { firestoreUpdateDocument } from "@/api/firestore";
import { toast } from "react-toastify";
import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
export const FinalStep = ({ isFinalStep }: BaseComponentProps) => {
  const { authUser, reloadAuthUserData } = useAuth();
  const { value: isLoading, toggle } = useToggle();


  const refAnimationInstance = useRef<((opts:any) => void) | null>(null);
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance.confetti; // Assurez-vous d'accéder à la propriété confetti
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
    }
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    makeShot(0.2, {
        spread: 26,
        startVelocity: 55,
      });
      makeShot(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        startVelocity: 55,
      });
      makeShot(0.1, {
        spread: 125,
        startVelocity: 120,
        decay: 0.92,
        scalar: 1.2, 
      });
      makeShot(0.15, {
        spread: 85,
        startVelocity: 75,
        decay: 0.92,
        scalar: 1.2, 
      });
      makeShot(0.3, {
        spread: 1100,
        startVelocity: 65,
        decay: 0.92,
        scalar: 1.2, 
      });
      
  }, [makeShot]);

  useEffect(()=> { // on lance les confettis dans un useEffect
    setTimeout(() => {
        fire()
    }, 50)
}, [])


  const handleCloseOnboarding = async () => {
    toggle();
    const data ={
        onboardingIsCompleted : true,
    };

    const { error } = await firestoreUpdateDocument(
        "users", 
        authUser.uid, 
        data
    );
    if (error) {
        toggle();
        toast.error(error.message);
        return;
    }
    reloadAuthUserData();
    toggle();
  };


  return (
    <>
        <ReactCanvasConfetti
        onInit={(instance) => getInstance(instance)}
        style={{
            zIndex: 9999, // pour que les confetti passent devant le logo
          position: "fixed",
          width: "100%",
          height: "100%",
          top: -80,
          left: 0,
        }}
      />

        <div className="relative h-screen pb-[91px]">
         <div className="h-full overflow-auto">
        <Container className="h-full">
            <div className="relative z-10 flex items-center h-full py-10">
            <div className="w-full max-w-xl mx-auto space-y-5 pb-4.5">
            <div className="flex justify-center">
                <Logo size="large"/>
            </div>
              <Typography variant="h1" component="h1" className="text-center">
                 Félicitations!
              </Typography>
              <Typography
                variant="body-base"
                component="p"
                theme="gray"
                className="text-center"
              >
                Bienvenue dans la communauté ! Nous sommes heureux de t&apos;avoir avec nous. Tu vas pouvoir explorer de nouvelles méthodes pour gérer le stress, échanger des astuces bien-être et rencontrer d&apos;autres étudiants passionnés par le développement personnel. Prépare-toi, car notre communauté est prête à t&apos;accompagner vers l&apos;épanouissement et la réussite académique !
              </Typography>
            
          </div>
            </div>
         

        </Container>
      </div>
      <OnboardingFooter
          isFinalStep={isFinalStep}
          next={handleCloseOnboarding}
          isLoading={isLoading}
        />
    </div>
    </>
  );
};
