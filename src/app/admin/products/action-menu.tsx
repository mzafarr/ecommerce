import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "./page";

export const ActionMenu = ({
  setShowCreateDialog,
  setShowDeleteDialog,
  setProductToUpdate,
  setProductToDelete,
  product,
}: {
  setShowCreateDialog: Dispatch<SetStateAction<boolean>>;
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setProductToUpdate: Dispatch<SetStateAction<Product | undefined>>;
  setProductToDelete: Dispatch<SetStateAction<Product | undefined>>;
  product: Product;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setProductToUpdate(product);
              setShowCreateDialog(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setProductToDelete(product);
              setShowDeleteDialog(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
