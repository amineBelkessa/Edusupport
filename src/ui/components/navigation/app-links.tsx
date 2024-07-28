import { AppLinks } from "@/types/app-links";
import { RiYoutubeFill, RiLinkedinFill, RiSlackFill } from "react-icons/ri";

export const footerApplicationLinks:AppLinks[] = [
    {
      label: "Accueil",
      baseUrl: "/",
      type: "internal",
    },
    {
      label: "Projets",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "Coders Monkeys",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "Formations",
      baseUrl: "https://youtube.com/@remotemonkey",
      type: "external",
    },
  ];
export const footerUsersLinks: AppLinks[] = [
    {
      label: "Mon espace",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "Connexion",
      baseUrl: "/connexion",
      type: "internal",
    },
    {
      label: "Inscription",
      baseUrl: "/connexion/inscription",
      type: "internal",
    },
    {
      label: "Mot de passe oublié",
      baseUrl: "/connexion/mot-de-passe-perdu",
      type: "internal",
    },
  ];
export const footerInformationLinks: AppLinks[] = [
    {
      label: "CGU",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "Confidentialité",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "À propos",
      baseUrl: "/#",
      type: "internal",
    },
    {
      label: "Contact",
      baseUrl: "/#",
      type: "internal",
    },
  ];
export const footerSocialNetworksLinks: AppLinks[] = [
    {
      label: "Youtube",
      baseUrl: "https://youtube.com/@remotemonkey",
      type: "external",
      icon:RiYoutubeFill,
    },
    {
      label: "Linkedin",
      baseUrl: "https://www.linkedin.com/in/arnaud-desportes-71999446/",
      type: "external",
      icon:RiLinkedinFill,
    },
    {
      label: "Slack",
      baseUrl: "https://coders-monkeys.slack.com",
      type: "external",
      icon:RiSlackFill,
    },
  ];
export const footerLinks = [
    {
      label: "App",
      links: footerApplicationLinks,
    },
    {
      label: "Utilisateurs",
      links: footerUsersLinks,
    },
    {
      label: "Informations",
      links: footerInformationLinks,
    },
    {
      label: "Réseaux",
      links: footerSocialNetworksLinks,
    },
  ];
  
    
  
  