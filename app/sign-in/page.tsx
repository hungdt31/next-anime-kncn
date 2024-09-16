"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticeMessage } from "@/components/common/notice-message";

const SignInButton = () => {
  const { toast } = useToast();
  const search = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const handleSignIn = async (provider: string) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
      .then((result) => {
        if (result?.error) alert("Invalid Credentials!");
        else
          toast({
            title: "Logged In",
            description: "You have successfully logged in.",
          });
      })
      .catch((err) => {
        alert(`Error Occured: ${err}`);
      });
  };
  useEffect(() => {
    if (search.get("error") == "OAuthAccountNotLinked") {
      setError("Another account already exists with the same e-mail address");
    } else {
      setError(null);
    }
  }, [search]);
  return (
    <div className="mt-[100px] flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">LOGIN TO NEXT ANIME</CardTitle>
          <CardDescription>Have a good experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5 flex-wrap mb-5">
            <Button onClick={async () => await handleSignIn("github")}>
              <FaGithub className="mr-3" /> Sign In With GitHub
            </Button>
            <Button onClick={async () => await handleSignIn("google")}>
              <FaGoogle className="mr-3" /> Sign In With Google
            </Button>
          </div>
          <NoticeMessage message={error} />
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button variant={"link"} className="flex items-center gap-3">
              <SquareArrowLeft size={24} /> Not right now?
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInButton;
