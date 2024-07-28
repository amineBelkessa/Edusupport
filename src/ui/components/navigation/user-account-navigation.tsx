import { firebaseLogoutUser } from "@/api/authentification";
import { toast } from "react-toastify";
import { Box } from "@/ui/design-system/box/box";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { ActiveLink } from "./active-link";

export const UserAccountNavigation = () => {
  const handleLogoutUser = async () => {
    const { error } = await firebaseLogoutUser();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("À bientôt sur EduSupport");
  };

  return (
    <Box className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mon-espace">Mon Compte</ActiveLink>
        </Typography>
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mon-compte/mes-projets">
            Mes projets
          </ActiveLink>
        </Typography>
      </div>
      <div>
        <Button action={handleLogoutUser} variant="danger">
          Déconnexion
        </Button>
      </div>
    </Box>
  );
};
