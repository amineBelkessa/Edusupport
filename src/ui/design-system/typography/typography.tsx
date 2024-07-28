import React from "react";
import clsx from "clsx";

interface Props {
  variant?: 
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "black" | "gray" | "gray-600" | "white" | "primary" | "secondary" | "danger" | "success" | "warning";
  weight?: "regular" | "medium";
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  variant = "h3",
  component: Component = "div",
  theme = "black",
  weight = "medium",
  className,
  children,
}: Props) => {
  let variantStyles = "";
  let colorStyles = "";

  switch (variant) {
    case "display":
      variantStyles = "text-8xl";
      break;
    case "h1":
      variantStyles = "text-7xl";
      break;
    case "h2":
      variantStyles = "text-6xl";
      break;
    case "h3": // par défaut
      variantStyles = "text-5xl";
      break;
    case "h4":
      variantStyles = "text-4xl";
      break;
    case "h5":
      variantStyles = "text-3xl";
      break;
    case "lead":
      variantStyles = "text-2xl";
      break;
    case "body-lg":
      variantStyles = "text-lg";
      break;
    case "body-base":
      variantStyles = "text-base";
      break;
    case "body-sm":
      variantStyles = "text-sm";
      break;
    case "caption1":
      variantStyles = "text-xs"; // Adaptez ces classes si elles n'existent pas
      break;
    case "caption2":
      variantStyles = "text-xs"; // Assurez-vous que les classes existent
      break;
    case "caption3":
      variantStyles = "text-xs"; // ou créez-les si nécessaire
      break;
    case "caption4":
      variantStyles = "text-xs"; // selon vos besoins de design
      break;
    default:
      variantStyles = "text-base";
  }

  switch (theme) {
    case "black": // Par défaut
      colorStyles = "text-black";
      break;
    case "gray":
      colorStyles = "text-gray-700";
      break;
    case "gray-600":
      colorStyles = "text-gray-600";
      break;
    case "white":
      colorStyles = "text-white";
      break;
    case "primary":
      colorStyles = "text-primary";
      break;
    case "secondary":
      colorStyles = "text-secondary";
      break;
    case "danger":
      colorStyles = "text-danger";
      break;
    case "success":
      colorStyles = "text-success";
      break;
    case "warning":
      colorStyles = "text-warning";
      break;
    default:
      colorStyles = "text-black"; // Valeur par défaut pour la couleur
  }

  return (
    <Component className={clsx(variantStyles, colorStyles, weight === "medium" && "font-medium", className)}>
      {children}
    </Component>
  );
};

