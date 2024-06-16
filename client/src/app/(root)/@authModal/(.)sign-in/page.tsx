import React from "react";
import ModalWrapper from "@/components/modalWrapper";
import SignInForm from "@/components/auth/signInForm";

function SignInModal() {
  return (
    <ModalWrapper>
      <SignInForm />
    </ModalWrapper>
  );
}

export default SignInModal;
