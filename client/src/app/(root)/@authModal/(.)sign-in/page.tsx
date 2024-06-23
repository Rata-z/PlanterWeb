import React from "react";
import ModalWrapper from "@/components/modalWrapper";
import SignInForm from "@/components/authComponents/signInForm";

function SignInModal() {
  return (
    <ModalWrapper>
      <div className="absolute top-10 flex w-min flex-col rounded-2xl border-2 border-pink-300 bg-slate-100 p-4 dark:bg-card">
        <SignInForm />
      </div>
    </ModalWrapper>
  );
}

export default SignInModal;
