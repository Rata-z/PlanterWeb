import React from "react";
import ModalWrapper from "@/components/modalWrapper";
import SignInForm from "@/components/authComponents/signInForm";

function SignInModal() {
  return (
    <ModalWrapper>
      <SignInForm />
    </ModalWrapper>
  );
}

export default SignInModal;
