"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
  disabled?: boolean;
}

export const ConfirmModal = ({
  children,
  title,
  description,
  onConfirm,
  disabled = false,
}: ConfirmModalProps) => {
  return (
    <AlertDialog>
      {/* Trigger */}
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>

      {/* Modal */}
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()} // prevents dropdown closing issue
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={disabled}
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
