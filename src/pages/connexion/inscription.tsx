import { Seo } from "@/ui/components/seo";
import { Layout } from "@/ui/components/layout/layout";
import { RegisterContainer } from "@/ui/modules/authentifiaction/register/register.container";
import { GUEST } from "@/lib/session-status";
export default function Register() {
  return (
    <>
      <Seo title="Inscription sur EduSupport" description="Description..." />
      <Layout sessionStatus={GUEST}>
       <RegisterContainer/>
      </Layout>

      
    </>
    
  );
}