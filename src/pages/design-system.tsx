import { Navigation } from "@/ui/components/navigation/navigation";
import { Seo } from "@/ui/components/seo";
import { Avatar } from "@/ui/design-system/avatar/avatar";
import { Button } from "@/ui/design-system/button/button";
import { Logo } from "@/ui/design-system/logo/logo";
import { Spinner } from "@/ui/design-system/spinner/spinner";
import { Typography } from "@/ui/design-system/typography/typography";
import { Container } from "@/ui/components/container/container";
import { RiUser6Fill } from "react-icons/ri";
import { Layout } from "@/ui/components/layout/layout";

export default function DesignSystem(){
    return(
        <>
         <Seo title="Design System" description="Description..." />
      <Layout>
      <Container className="py-10 space-y-16">
      <div className="flex flex-col items-center gap-4 p-10">
      <Typography theme="primary" variant="display" component="div">
        EduSupport
      </Typography>
      <Typography theme="gray" variant="h1" component="div">
        EduSupport
      </Typography>
      <Typography theme="secondary" variant="lead" component="div">
         EduSupport
      </Typography>
      <Typography variant="body-sm" component="div">
         EduSupport
      </Typography>
      <Typography variant="caption4" component="div">
          EduSupport
      </Typography>
      <Typography variant="caption4" weight="medium" component="div">
          EduSupport
      </Typography>
      </div>
        <div className="flex flex-col items-center gap-4 p-10">
          <Typography variant="caption2" weight="medium" className="mb-4">
            Spinners
          </Typography>
          <div className="flex justify-center gap-4">
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
          </div>
        </div>
        
        <div className="space-y-4">
          <Typography variant="caption2" weight="medium" className="text-center">
            Logo
          </Typography>
          <div className="flex justify-center items-center gap-4 p-4 border border-gray-400 rounded">
            <Logo size="very-small" />
            <Logo size="small" />
            <Logo />
            <Logo size="large" />
          </div>
        </div>
        
        <div className="space-y-4">
          <Typography variant="caption2" weight="medium" className="text-center">
            Avatar
          </Typography>
          <div className="flex justify-center items-center gap-4 p-4 border border-gray-400 rounded">
            <Avatar src="/assets/images/daniel-lincoln-pe-X2NUwVQo-unsplash 1.png" alt="Avatar de Daniel Lincoln" size="small"/>
            <Avatar src="/assets/images/daniel-lincoln-pe-X2NUwVQo-unsplash 1.png" alt="Avatar de Daniel Lincoln"/>
            <Avatar src="/assets/images/daniel-lincoln-pe-X2NUwVQo-unsplash 1.png" alt="Avatar de Daniel Lincoln" size="large"/>
          </div>
          <div className="flex justify-center items-center gap-4 p-4 border border-gray-400 rounded">
            <Avatar src="/assets/images/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg" alt="Avatar de Panda Man" size="small"/>
            <Avatar src="/assets/images/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg" alt="Avatar de Panda Man"/>
            <Avatar src="/assets/images/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg" alt="Avatar de Panda Man" size="large"/>
          </div>
        </div>
        
        <div className="space-y-4">
          <Typography variant="caption2" weight="medium" className="text-center">
            Buttons
          </Typography>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-4">
              <Button isLoading size="small">Accent</Button>
              <Button isLoading size="small" icon={{ icon: RiUser6Fill }} iconPosition="left">Accent</Button>
              <Button isLoading size="small" icon={{ icon: RiUser6Fill }}>Accent</Button>
              <Button isLoading size="small" variant="secondary">Secondary</Button>
              <Button isLoading size="small" variant="outline">Accent</Button>
              <Button isLoading size="small" variant="disabled" disabled>Accent</Button>
              <Button isLoading size="small" variant="icon" icon={{ icon: RiUser6Fill }}></Button>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button size="large">Accent</Button>
              <Button size="large" variant="secondary">Secondary</Button>
              <Button size="large" variant="outline">Accent</Button>
              <Button size="large" variant="disabled">Accent</Button>
              <Button size="large" variant="icon" icon={{ icon: RiUser6Fill}}/>
              <Button size="large" variant="icon" icon={{ icon: RiUser6Fill}} iconTheme="secondary"/>
              <Button size="large" variant="icon" icon={{ icon: RiUser6Fill}} iconTheme="gray"/>
            </div>
          </div>
        </div>
      </Container>
      </Layout>
        </>
    )

}