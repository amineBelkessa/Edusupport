import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { Button } from "@/ui/design-system/button/button";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Typography } from "@/ui/design-system/typography/typography";
import { Container } from "@/ui/components/container/container";
import Image from "next/image";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
export const WelcomeStep = ({ next, isFirstStep, isFinalStep,stepsList,getCurrentStep, }: BaseComponentProps) => {
  return (
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
                Bienvenue sur l&apos;appli EduSupport !
              </Typography>
              <Typography
                variant="body-base"
                component="p"
                theme="gray"
              >
                Explore nos outils pour gérer ton stress, améliore ta productivité et trouve l&apos;équilibre. Prêt à découvrir des stratégies efficaces pour un bien-être optimal ?
              </Typography>
            </div>
          </div>
          <div className="flex items-center h-full col-span-6">
            <div className="w-full">
              <Image
                src="/assets/svg/welcome.svg"
                alt="Illustration welcome..."
                width={811}
                height={596}
              />
            </div>
          </div>

        </Container>
      </div>

      <OnboardingFooter
        next={next}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
      />
    </div>
  );
};
