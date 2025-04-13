import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDialogProps {
  url: string;
  title: string;
}

export function QRCodeDialog({ url, title }: QRCodeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 sm:h-11 w-10 sm:w-11 rounded-md ml-2"
          title="Show QR Code"
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-lg font-semibold text-center">{title}</DialogTitle>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-lg border p-4">
            <QRCodeSVG
              value={url}
              size={200}
              level="H"
              includeMargin
              className="rounded-lg"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Scan this QR code to {title.toLowerCase()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 