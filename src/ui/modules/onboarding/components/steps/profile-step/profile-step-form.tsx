import { FormsType } from "@/types/form";
import { Input } from "@/ui/design-system/forms/input";
import { Textarea } from "@/ui/design-system/forms/textarea";
interface Props{
    form:FormsType
}

export const ProfileStepForm = ({ form }: Props) => {
    const { register, errors, isLoading } = form;
    return (
      <form className="w-full max-w-md space-y-4  mt-20">
        <Input
          label="Nom d'utilisateur"
          isLoading={isLoading}
          placeholder="john doe"
          type="text"
          register={register}
          errors={errors}
          errorMsg="Tu dois renseigner un pseudo"
          id="displayName"
        />
        <Input
          label="Spécialité"
          isLoading={isLoading}
          placeholder="système informatiques intelligent/..."
          type="text"
          register={register}
          errors={errors}
          errorMsg="Tu dois renseigner ta spécialité"
          id="expertise"
        />
        <Textarea
          label="Biographie"
          isLoading={isLoading}
          placeholder="Indique une courte description de toi et de ton parcours..."
          rows={5}
          register={register}
          errors={errors}
          errorMsg="Tu dois renseigner ce champ"
          id="biography"
        />
      </form>
    );
  };
  