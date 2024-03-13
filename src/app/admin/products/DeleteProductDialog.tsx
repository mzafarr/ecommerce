import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Product } from "./page";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { productControllerDelete } from "../../../api/product";

export default function DeleteProductDialog({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  product: Product | undefined;
}) {
  const deleteProduct = useCallback(async (id: string) => {
    // return await productControllerDelete(id);
    return await axios.delete(`/api/products/${id}`);
  }, []);

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      onClose(false);
      return toast({
        variant: "success",
        title: "Success",
        description: "Product successfully deleted",
      });
    },
  });

  const onClickYes = useCallback(() => {
    if (product) deleteProductMutation.mutate(product?.id);
  }, [product, deleteProductMutation]);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        onClose(e);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium">Are you sure?</DialogTitle>
          <hr />
        </DialogHeader>
        <DialogFooter className="mt-5">
          <Button onClick={(e) => onClickYes()} variant={"destructive"}>
            Yes
          </Button>
          <Button onClick={(e) => onClose(false)}>No</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
