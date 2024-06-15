import React from "react";
import ModalWrapper from "@/components/modalWrapper";
import SignInForm from "@/components/auth/signInForm";

function SignInModal() {
  return (
    <div className="w-80">
      <ModalWrapper>
        <SignInForm />
      </ModalWrapper>
    </div>
  );
}

export default SignInModal;
