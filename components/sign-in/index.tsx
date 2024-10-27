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
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticeMessage } from "@/components/common/notice-message";

const SignInForm = () => {
  const { toast } = useToast();
  const search = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const handleSignIn = (provider: string) => {
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
    <div className="mt-[100px] flex justify-center mx-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">LOGIN TO NEXT ANIME</CardTitle>
          <CardDescription>Manage your account, check notifications, comment on anime, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5 flex-wrap mb-5 justify-center">
            <button onClick={() => handleSignIn("github")} className="dark:border-2 dark:border-white dark:text-white dark:bg-black flex items-center p-3 shadow-md">
              <FaGithub className="mr-3" /> Sign In with GitHub
            </button>
            <button onClick={() => handleSignIn("google")} className="dark:border-2 dark:border-white dark:text-white dark:bg-black flex items-center p-3 shadow-md">
              <FcGoogle className="mr-3" /> Sign In with Google
            </button>
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

export default SignInForm;