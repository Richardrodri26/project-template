import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppForm } from "@/components/TanstackForm";
import { zodFormValidator } from "@/components/TanstackForm/validators/zodValidators";
import { LoginSchema, type LoginSchemaType } from "../schemas";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const form = useAppForm({
    validators: zodFormValidator(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    } as LoginSchemaType,
    onSubmit: (values) => {
      console.log(values);
      navigate({ to: "/app" });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        className="flex flex-col gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.AppForm>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">proyecto</span>
              </a>
              <h1 className="text-xl font-bold">Proyecto</h1>
              <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  regístrate
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <form.FormRow className="flex-col">
                <form.AppField
                  name="email"
                  children={(fieldApi) => (
                    <fieldApi.TextFieldForm
                      label="Correo electrónico"
                      placeholder="Correo electrónico"
                    />
                  )}
                />
                <form.AppField
                  name="password"
                  children={(fieldApi) => (
                    <fieldApi.TextFieldForm
                      label="Contraseña"
                      placeholder="Contraseña"
                    />
                  )}
                />
              </form.FormRow>
            

              <form.SubscribeButton
                variants={{ size: "sm" }}
                label="Confirmar"
              />
            </div>
          </div>
        </form.AppForm>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Términos y condiciones
      </div>
    </div>
  );
}
