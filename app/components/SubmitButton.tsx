"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// Cambia la importación de useFormStatus al paquete correcto
import { useFormStatus } from "react-dom"; // Asegúrate de que esta importación es correcta
import GithubLogo from "@/public/github.svg";
import GoogleLogo from "@/public/google.svg";


interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          variant={variant}
          type="submit"
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image
            src={GithubLogo}
            className="size-4 mr-2 dark:invert"
            alt="GitHub Logo" // Corrige el alt text
          />
          Sign in with GitHub
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} className="size-4 mr-2" alt="Google Logo" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}
