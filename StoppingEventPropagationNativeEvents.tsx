import React, { ReactNode, useEffect, useState, useRef } from "react";





type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
const Modal = ({
  onClose,
  children,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="modal-dialog">
      <div className="content">{children}</div>
      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};
export const withSuppressKeyPress = (Component: any) => {
  return (props: any) => {
    const WrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const WrapperDiv = WrapperRef.current;

      if (WrapperDiv) {
        const eventHandler = (e: any) => {
          console.log("propagation of native event has stopped");
          e.stopPropagation();
        };

        WrapperDiv.addEventListener("keyup", eventHandler);
        WrapperDiv.addEventListener("keydown", eventHandler);
        WrapperDiv.addEventListener("keypress", eventHandler);
      }

      return () => {
        WrapperDiv?.removeEventListener("keyup", eventHandler);
        WrapperDiv?.removeEventListener("keydown", eventHandler);
        WrapperDiv?.removeEventListener("keypress", eventHandler);
      };
    }, []);

    return (
      <div ref={WrapperRef}>
        <Component {...props} />
      </div>
    );
  };
};

const ModalWithSuppressedKeyPress = withSuppressKeyPress(Modal);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Listen for all relevant keyboard events at the window level
    const eventHandler = (e: KeyboardEvent) => {
      console.info(`Key ${e.key} (${e.type}) received at window level`);
    };

    // We'll add listeners for keyup, keydown, and keypress at the window level
    // to see which ones are stopped by the HOC.
    window.addEventListener("keypress", eventHandler);
    window.addEventListener("keyup", eventHandler);
    window.addEventListener("keydown", eventHandler);

    return () => {
      window.removeEventListener("keypress", eventHandler);
      window.removeEventListener("keyup", eventHandler);
      window.removeEventListener("keydown", eventHandler);
    };
  }, []);

  return (
    <>
      <p>
        If modal dialog is opened and focused, the key press events will stop
        propagating from it
      </p>
      <p>
        Our listener in useEffect will stop logging events when the modal is
        focused
      </p>

      <Button onClick={() => setIsOpen(true)}>Click to open dialog</Button>
      {isOpen && (
        <ModalWithSuppressedKeyPress onClose={() => setIsOpen(false)}>
          <input autoFocus placeholder="something" />
        </ModalWithSuppressedKeyPress>
      )}
    </>
  );
}
