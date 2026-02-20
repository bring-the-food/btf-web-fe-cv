import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogCProps = {
  open: boolean;
  setOpen?: (open: boolean) => void;
  onClose?: () => void;
  hasNoClose?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
};

export function DialogC({
  open,
  setOpen,
  onClose,
  hasNoClose,
  trigger,
  children,
}: DialogCProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onClose={onClose}
        showCloseButton={hasNoClose ? false : true}
        className="sm:max-w-[400px]"
        onInteractOutside={(e) => {
          if (hasNoClose) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (hasNoClose) {
            e.preventDefault();
          }
        }}
      >
        <DialogTitle className="hidden"></DialogTitle>

        {children}
      </DialogContent>
    </Dialog>
  );
}
