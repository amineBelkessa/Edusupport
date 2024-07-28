import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { UserAccountContainer } from "@/ui/modules/user-profile/user-account/user-account.container";
import { REGISTERED } from "@/lib/session-status";

export default function Home() {
  return (
    <>
      <Seo title="Mon Espace" description="Description..." />
      <Layout withSidebar={true} sessionStatus={REGISTERED}>
        <UserAccountContainer/>
      </Layout>

      
    </>
    
  );
}
