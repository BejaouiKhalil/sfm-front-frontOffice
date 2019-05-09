import React from "react";

const Notif = ({ message, etat }) => {
  return (
    <>
      <div className={`alert alert-${etat}`} role="alert">
        {message}
      </div>
    </>
  );
};

export default Notif;
