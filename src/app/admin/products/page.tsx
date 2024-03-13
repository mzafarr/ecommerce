"use client";
import axios from "axios";
import { DataTable } from "./data-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "./action-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import CreateProductDialog from "./createProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  name: string;
  description: string;
  category: "laptop" | "phone" | "accessory";
  price: number;
  images: { url: string }[];
};

export default function Page() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | undefined>();
  const [productToDelete, setProductToDelete] = useState<Product | undefined>();
  const [productImage, setProductImage] = useState<Product | undefined>();

  async function getData(): Promise<any> {
    // async function getData(): Promise<Payment[]> {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  }
  useEffect(() => {
    getData();
  }, []);

  const onCloseCreateDialog = useCallback(() => {
    setProductToUpdate(undefined);
    setShowCreateDialog(!showCreateDialog);
  }, [showCreateDialog, products]);

  const onCloseDeleteDialog = useCallback(() => {
    setShowDeleteDialog(!showDeleteDialog);
    // products.refetch();
  }, [showDeleteDialog, products]);

  const columns = useMemo<ColumnDef<Product, any>[]>(() => {
    {
      const columns: ColumnDef<Product>[] = [
        {
          header: "Image",
          accessorKey: "image",
          cell: ({ cell }) => {
            return (
              <Image
                src={cell.row.original.images[0].url}
                alt="image"
                height={60}
                width={60}
                // onClick={() => openImage(cell.row.original)}
              />
            );
            // )
            //  : (
            //   <CiImageOff size={20} />
            // );
          },
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "description",
          header: "Description",
        },
        {
          accessorKey: "category",
          header: "Category",
          cell: ({ row }) => (
            <Badge variant="secondary" className="font-semibold">
              {row.original.category}
            </Badge>
          ),
        },
        {
          accessorKey: "price",
          header: "Price",
        },
        {
          header: "Action",
          id: "actions",
          cell: ({ cell }) => (
            <ActionMenu
              setShowCreateDialog={setShowCreateDialog}
              setShowDeleteDialog={setShowDeleteDialog}
              setProductToUpdate={setProductToUpdate}
              setProductToDelete={setProductToDelete}
              product={cell.row.original}
            />
          ),
        },
      ];
      return columns;
    }
  }, []);

  return (
    <div className="flex flex-col">
      <CreateProductDialog
        open={showCreateDialog}
        onClose={onCloseCreateDialog}
        product={productToUpdate}
        existingProducts={products || []}
      />
      <DeleteProductDialog
        open={showDeleteDialog}
        onClose={onCloseDeleteDialog}
        product={productToDelete}
      />
      <div className="flex justify-between w-full max-w-[1100px] mx-auto mt-5">
        <h1 className="font-medium text-black text-3xl font-sans tracking-wide">
          Products
        </h1>
        <div>
          <Button onClick={() => setShowCreateDialog(!showCreateDialog)}>
            New Product
          </Button>
        </div>
      </div>
      <div className="border border-solid border-gray-300 w-full rounded-md mt-5"></div>
      <div className="bg-white container mx-auto py-10 mt-4">
        <DataTable columns={columns} data={products ? products : []} />
      </div>
    </div>
  );
}
