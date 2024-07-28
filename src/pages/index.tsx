import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { LandingPageView } from "@/ui/modules/landing-page/landing-page.view";
import { GUEST } from "@/lib/session-status";

export default function Home() {
  return (
    <>
      <Seo title="EduSupport" description="Description..." />
      <Layout isDisplayBreakcrumbs = {false} sessionStatus={GUEST}>
        <LandingPageView/>
      </Layout>

      
    </>
    
  );
}
