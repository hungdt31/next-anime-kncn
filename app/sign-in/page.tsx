import { Suspense } from "react";
import SignInForm from "@/components/sign-in";
import { SkeletonCards } from "@/components/loading/skeleton";

const SignInPage: React.FC = () => {
  return (
    <Suspense fallback={<SkeletonCards />}>
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
