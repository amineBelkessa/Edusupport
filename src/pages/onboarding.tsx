import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { LandingPageView } from "@/ui/modules/landing-page/landing-page.view";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { Session } from "@/ui/components/session/session";
import { OnboardingContainer } from "@/ui/modules/onboarding/onboarding.container";

export default function Onboarding() {
  return (
    <>
      <Seo title="Onboarding" description="Description..." />
      <Session sessionStatus={REGISTERED}>
        <OnboardingContainer/>
      </Session>

      
    </>
    
  );
}
