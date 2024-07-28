import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { features } from "process";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { Button } from "@/ui/design-system/button/button";
import { RiArrowRightLine } from "react-icons/ri";
import { SocialNetworksButtons } from "../navigation/social-networks-buttons";
interface FeaturesListInterface {
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
}

const featuresData: FeaturesListInterface[] = [
  {
    imagePath: "/assets/svg/Livre.svg",
    imageAlt: "illustration",
    title: "Ressources",
    description: "Accède à une bibliothèque de ressources pour t'aider à mieux gérer ton stress et à améliorer ton bien-être.",
  },
  {
    imagePath: "/assets/svg/calendrie.svg",
    imageAlt: "illustration",
    title: "Gestion du temps",
    description: "Apprends à mieux organiser ton emploi du temps pour équilibrer études et loisirs.",
  },
  {
    imagePath: "/assets/svg/meditation.svg",
    imageAlt: "illustration",
    title: "Techniques de relaxation",
    description: "Découvre des techniques de relaxation pour réduire ton stress et améliorer ta concentration.",
  },
  {
    imagePath: "/assets/svg/internet.svg",
    imageAlt: "illustration",
    title: "Communauté",
    description: "Rejoins une communauté d'étudiants partageant les mêmes préoccupations et trouve du soutien.",
  },
];

export const FeaturedView = () => {
  const featuredList = featuresData.map((feature) => (
    <div
      key={uuidv4()}
      className="flex flex-col items-center justify-center bg-white rounded p-7"
    >
      <div className="relative w-[130px] h-[130px] rounded-full mb-6 p-10 overflow-hidden"> 
        <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down blur-2xl" />
        <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down" />
      </div>

      <Typography
        variant="lead"
        component="h3"
        weight="medium"
        className="text-center mb-2.5"
      >
        {feature.title}
      </Typography>
      <Typography
        variant="body-base"
        component="p"
        theme="gray"
        className="text-center"
      >
        {feature.description}
      </Typography>
    </div>
  ));
  return (
    <div className="bg-gray-300">

      <Container className="grid grid-cols-12 gap-24 py-24">
        <div className="grid grid-cols-2 col-span-7 gap-7">
          {featuredList}
        </div>
        <div className="flex flex-col justify-between col-span-5 gap-10">
          <div>
            <Typography
              variant="h2"
              component="h2"
              className="mb-8"
            >
              Ton assistant personnel pour gérer le stress
            </Typography>
            <Typography
              variant="body-lg"
              theme="gray"
              component="p"
              className="mb-8"
            >
              Obtiens des conseils personnalisés, des techniques de relaxation et une gestion du temps optimale. Rejoins notre communauté pour une vie étudiante plus sereine et équilibrée !
            </Typography>
            <Button
              variant="secondary"
              baseUrl="/#"
              icon={{ icon: RiArrowRightLine }}
              iconPosition="right"
            >
              Commencer
            </Button>
          </div>
          <div>
            <Typography
              variant="caption3"
              theme="gray"
              component="div"
              className="mb-4"
            >
              Nos réseaux sociaux
            </Typography>
            <SocialNetworksButtons />
          </div>
        </div>


      </Container>
    </div>
  );
  
};

