import { Container } from "@/ui/components/container/container";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";

export const HeroTopView = () => {
  return (
    <Container className="relative pt-40 overflow-hidden pb-52">
      <div className="w-full max-w-xl space-y-5">
        <Typography variant="h1" component="h1" className="max-w-lg">
          Rejoins la team EduSupport !
        </Typography>
        <Typography variant="body-lg" theme="gray" component="p" className="max-w-xl">
          Gère ton stress et maximise ta productivité avec notre assistant virtuel. Optimise ton emploi du temps et trouve les ressources pour réussir tes études sereinement.
        </Typography>
        <div className="space-x-5 pt-2.5">
          <Button baseUrl="">Commencer</Button>
          <Button baseUrl="" variant="secondary">
            En savoir plus
          </Button>
        </div>
      </div>
      <Image
        src="/assets/svg/rocket.svg"
        alt="Illustration d&apos;une fusée pour matérialiser l&apos;évolution du level des développeurs front-end"
        width={811}
        height={596}
        className="absolute top-0 right-0 z-0"
      />
    </Container>
  );
};

