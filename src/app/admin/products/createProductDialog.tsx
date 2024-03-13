"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { CiImageOff } from "react-icons/ci";
import { Product } from "./page";
import { toast } from "sonner";
import axios from "axios";
import Loading from "@/components/Common/Loading";

export default function CreateProduct({
  open,
  onClose,
  product,
  existingProducts,
}: {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  product: Product | undefined;
  existingProducts: Product[] | [];
}) {
  const queryClient = useQueryClient();

  // const getCategories = useCallback(async () => {
  //   return await categoryControllerAll();
  // }, []);
  // const categories = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getCategories,
  //   refetchOnWindowFocus: false,
  // });

  // const [imageFile, setImageFile] = useState<File>();
  // const [image, setImage] = useState("");
  // const createImage = useCallback(async (data: CreateImageDto) => {
  //   return await imageControllerCreate(data);
  // }, []);

  // const updateImage = useCallback(async (data: UpdateImageDto) => {
  //   return await imageControllerUpdate(product?.imageId!, data);
  // }, []);

  // const createImageMutation = useMutation({
  //   mutationKey: ["createImage"],
  //   mutationFn: (data: CreateImageDto) => {
  //     return createImage(data);
  //   },
  //   onSuccess: (data: ImageType) => {
  //     form.setValue("imageId", data.id);
  //   },
  // });
  // const updateImageMutation = useMutation({
  //   mutationKey: ["updateImage"],
  //   mutationFn: (data: UpdateImageDto) => {
  //     return updateImage(data);
  //   },
  // });

  const schema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "name is required"),
    description: z.string(),
    category: z.string(),
    images: z.array(z.object({ url: z.string() })),
    price: z.number(),

    // categoryId: z.string(),
    // imageId: z.string().optional().nullable(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: product ? product.id : undefined,
      name: product ? product.name : "",
      description: product ? product.description : "",
      category: product ? product.category : "",
      images: product ? product.images : [],
      price: product ? product.price : 0,

      // categoryId: product ? product.categoryId : "",
      // imageId: product ? product.imageId : undefined,
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue("id", product.id);
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("category", product.category);
      form.setValue("images", product.images);
      form.setValue("price", product.price);

      // form.setValue("categoryId", product.categoryId);
      // form.setValue("imageId", product.imageId);
    }
    console.log(form.getValues());
    console.log(form.formState);
  }, [product, form]);

  // useEffect(() => {
  //   if (product && product.imageId) {
  //     setImage(product.image.url);
  //   } else {
  //     setImage("");
  //   }
  // }, [product]);

  // const createProduct = useCallback(async (data: CreateProductdto) => {
  const createProduct = useCallback(async (data) => {
    // return await productControllerCreate(data);
    return await axios.post("/api/products", data);
  }, []);

  // const updateProduct = useCallback(async (data: UpdateProductdto) => {
  const updateProduct = useCallback(async (data) => {
    // return await productControllerUpdate(data);
    return await axios.put(`/api/products/${data.id}`, data);
  }, []);

  const createProductMutation = useMutation({
    mutationKey: ["createProduct"],
    // mutationFn: (data: CreateProductdto) => createProduct(data),
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      form.reset();
      // setImage("");
      onClose(false);
      queryClient.invalidateQueries(["products"]);
      return toast({
        variant: "success",
        title: "Success",
        description: "Product Added Successfully",
      });
    },
    onError: (error) => {
      return toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationKey: ["updateProduct"],
    // mutationFn: (data: UpdateProductdto) => updateProduct(data),
    mutationFn: (data) => updateProduct(data),
    onSuccess: () => {
      form.reset();
      // setImage("");
      onClose(false);
      queryClient.invalidateQueries(["products"]);
      return toast({
        variant: "success",
        title: "Success",
        description: "Product Updated Successfully",
      });
    },
    onError: (error) => {
      return toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      if (
        existingProducts.some(
          (product) =>
            product.name.toLowerCase() === data.name.toLowerCase() &&
            product.id !== data.id
        )
      ) {
        return toast({
          title: "Error",
          description: "Product with this name already exists",
          variant: "destructive",
        });
      }
      if (product) {
        updateProductMutation.mutate(data);
        // updateProductMutation.mutate(data as UpdateProductdto);
      } else {
        console.log(data);
        createProductMutation.mutate(data);
        // createProductMutation.mutate(data as CreateProductdto);
      }
    },
    [createProductMutation, updateProductMutation, product]
  );

  // if (categories.isLoading) return <Loading />;

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        form.reset();
        // setImage("");
        onClose(e);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {product ? "Edit Product" : "New Product"}
              </DialogTitle>
              <hr />
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {categories?.data && */}
                        {["laptop", "phone", "accessory"].map(
                          (category, index) => {
                            return (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="name">Image</label>
                {/* <Input
                  id="name"
                  placeholder="image"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        const dataUrl = reader.result as string;
                        const base64 = dataUrl.split(",")[1];
                        setImage(dataUrl);
                        if (product && product.imageId) {
                          updateImageMutation.mutate({
                            imageData: base64,
                            fileType: file.type,
                          });
                        } else {
                          createImageMutation.mutate({
                            imageData: base64,
                            fileType: file.type,
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                    // setImageFile(e.target.files![0]);
                  }}
                />
                {((product && product.image) || image) && (
                  <Image
                    className="rounded-md"
                    src={image}
                    height={50}
                    width={50}
                    alt="product image"
                  />
                )} */}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-3"
                disabled={!form.formState.isValid}
              >
                {
                  // createImageMutation.isLoading ||
                  // updateImageMutation.isLoading ||
                  createProductMutation.isLoading ||
                  updateProductMutation.isLoading ||
                  form.formState.isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Product"
                  )
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
