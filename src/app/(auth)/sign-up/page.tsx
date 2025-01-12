"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultsValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default page;
