import React, { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  overlayStyle,
  contentStyle,
  closeButtonStyle,
  dialogHeaderStyle,
  dialogFooterStyle,
  dialogTitleStyle,
  dialogDescriptionStyle,
} from "./DialogStyles";
import { IoMdClose } from "react-icons/io";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={className}
    style={overlayStyle}
    {...props}
  />
));

const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={className}
      style={contentStyle}
      {...props}
    >
      {children}
      <DialogPrimitive.Close style={closeButtonStyle}>
        {/* X button */}
        <IoMdClose />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

const DialogHeader = ({ className, ...props }) => (
  <div className={className} style={dialogHeaderStyle} {...props} />
);

const DialogFooter = ({ className, ...props }) => (
  <div className={className} style={dialogFooterStyle} {...props} />
);

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={className}
    style={dialogTitleStyle}
    {...props}
  />
));

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={className}
    style={dialogDescriptionStyle}
    {...props}
  />
));

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
