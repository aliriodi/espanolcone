import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ModalGeneric({ children, open, changeModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    changeModal(false);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]">
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-white rounded-[7px]">
            <FontAwesomeIcon
              icon={faX}
              onClick={closeModal}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
