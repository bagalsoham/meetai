import { Card } from "@/components/ui/card";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });
  
  if (!!session) {
    redirect('/');
  }
  
  return <SignInView />;
};

export default SignIn;