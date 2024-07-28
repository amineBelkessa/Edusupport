import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { LoginContainer } from "@/ui/modules/authentifiaction/login/login.container";
export default function Connexion() {
  return (
    <>
      <Seo title="Connexion sur EduSupport" description="Description..." />
      <Layout>
       <LoginContainer/>
      </Layout>

      
    </>
    
  );
}
  