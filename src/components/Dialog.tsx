import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogCProps = {
  open: boolean;
  setOpen?: (open: boolean) => void;
  hasNoClose?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
};

export function DialogC({
  open,
  setOpen,
  hasNoClose,
  trigger,
  children,
}: DialogCProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={hasNoClose ? false : true}
        className="w-[400px]"
      >
        <DialogTitle className="hidden"></DialogTitle>

        {children}
      </DialogContent>
    </Dialog>
  );
}
