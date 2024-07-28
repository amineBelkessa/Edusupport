import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { ForgetPasswordContainer } from "@/ui/modules/authentifiaction/forget-password/forget-password.container";
import { GUEST } from "@/lib/session-status";
export default function ForgetPassword() {
  return (
    <>
      <Seo title="Mot de passe perdu" description="Description..." />
      <Layout sessionStatus={GUEST} >
       <ForgetPasswordContainer/>
      </Layout>

      
    </>
    
  );
}
  
