import React, { useEffect, useRef, useState } from "react";
import Persona from "persona";
import signUpHooks from "../../features/SignUp/hooks";

const PersonaComponent = () => {
  const { handleSubmit } = signUpHooks();


  return (
    <Persona.Inquiry
      className="persona"
      templateId="itmpl_hp5mnnnbDQGRiPLLmppxW5dG"
      environmentId="env_pw2nwD6YDkHJBJVLH4H1jsta"
      onLoad={() => {
        console.log("Loaded inline");
      }}
      onComplete={({ inquiryId, status, fields }) => {
        console.log("Inquiry id", inquiryId);
        if (inquiryId) {
          handleSubmit(inquiryId, status);
        }
        // Inquiry completed. Optionally tell your server about it.
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
      }}
    />
  );
};

export default PersonaComponent;
