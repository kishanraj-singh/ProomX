"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { firestore } from "@/config/firebase";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { EllipsisVertical, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import generateTimeAgo from "@/helper/generateTimeAgo";
import AddBundleDialog from "./AddBundleDialog";
import Link from "next/link";
import { Badge } from "../ui/badge";
import formatNumber from "@/helper/formatNumber";
import AddBundleItemsDialog from "./AddBundleItemsDialog";
import { Spinner } from "../ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

export default function DataTable() {
  const [selectedBundleItems, setselectedBundleItems] = useState(0);
  const [bundles, setbundles] = useState(null);
  const [bundleItems, setbundleItems] = useState(null);
  const [loadingBundles, setloadingBundles] = useState(true);
  const [loadingbundleItems, setLoadingbundleItems] = useState(false);

  //get bundleItems lists
  const getbundles = async () => {
    setloadingBundles(true);
    const bundlesSnapshot = await getDocs(
      query(
        collection(firestore, "bundles/"),
        limit(10),
        orderBy("createdAt", "desc")
      )
    );
    setbundles(bundlesSnapshot.docs);
    setloadingBundles(false);
  };

  //get bundleItems
  const getbundleItems = async () => {
    if (bundles.length !== 0) {
      setLoadingbundleItems(true);
      const bundleItemsSnapshot = await getDocs(
        query(
          collection(firestore, "bundleItems/"),
          where("bundleSlug", "==", bundles?.[selectedBundleItems]?.data().slug)
        )
      );
      setbundleItems(bundleItemsSnapshot.docs);
      setLoadingbundleItems(false);
    }
  };
  //
  useState(() => {
    getbundles();
  }, []);
  //
  useEffect(() => {
    if (selectedBundleItems !== null && bundles) {
      getbundleItems();
    }
  }, [selectedBundleItems, bundles]);

  //delete bundle
  const deletebundle = async (bundle) => {
    const id = toast.loading("deleting...");
    const bundleItemsSnapshot = await getDocs(
      query(
        collection(firestore, "bundleItems/"),
        orderBy("createdAt", "desc"),
        where("bundleSlug", "==", bundle.data().slug)
      )
    );
    await updateDoc(doc(firestore, "appData/searchList"), {
      titles: arrayRemove(bundle.data().title),
    });
    if (!bundleItemsSnapshot.empty) {
      const batch = writeBatch(firestore);
      bundleItemsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
    await deleteDoc(bundle.ref);
    toast.success("Deleted", { id });
  };

  //delete bundleItems
  const deletebundleItems = async (bundleItems) => {
    const id = toast.loading("deleting...");
    await deleteDoc(bundleItems.ref);
    toast.success("Deleted", { id });
  };

  //toggle publish/draft bundleItems list
  const togglePublishbundle = async (bundle) => {
    if (bundle.data().status === "published") {
      await updateDoc(bundle.ref, {
        status: "draft",
      });
      toast.success("Set to draft");
    } else {
      await updateDoc(bundle.ref, {
        status: "published",
      });
      toast.success("Set to published");
    }
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="w-full flex justify-between items-center gap-2.5">
        <h1 className="text-lg">bundleItems Lists</h1>
        <div className="flex gap-2.5">
          <AddBundleDialog />
          <Button variant="outline" onClick={getbundles}>
            <RefreshCcw />
            Refresh
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="w-full h-[50px] bg-secondary">
            <TableRow>
              <TableHead className="pl-8">bundleItems lists</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Created At</TableHead>
              <TableHead className="text-center">Last Updated</TableHead>
              <TableHead className="text-center pr-8">Views</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loadingBundles ? (
              bundles?.map((bundle, index) => {
                const bundleData = bundle.data();
                return (
                  <TableRow key={index} className="h-[70px]">
                    <TableCell className="font-medium pl-8 w-[35%]">
                      <Link
                        href="/admin#bundleItems"
                        onClick={() => setselectedBundleItems(index)}
                        className="flex items-center gap-2 line-clamp-1 cursor-pointer"
                      >
                        <span>{index + 1}.</span>
                        <span></span>
                        {bundleData.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="pb-[2px]">
                        {bundleData.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {generateTimeAgo(bundleData.createdAt.toDate())}
                    </TableCell>
                    <TableCell className="text-center">
                      {generateTimeAgo(bundleData.lastUpdate.toDate())}
                    </TableCell>
                    <TableCell className="text-center pr-8">
                      {formatNumber(bundleData.views)}
                    </TableCell>
                    <TableCell className="w-[50px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <EllipsisVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link href="/admin#bundleItems">bundleItems</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => togglePublishbundle(bundle)}
                          >
                            {bundleData.status === "publish"
                              ? "draft"
                              : "publish"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deletebundle(bundle)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="relative">
                <TableCell className="h-100">
                  <Spinner className="absolute top-1/2 left-1/2 size-8" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex justify-between items-center gap-2.5 mt-10">
        <h1 className="text-lg">
          bundleItems of {bundles?.[selectedBundleItems]?.data().title}
        </h1>
        <div className="flex gap-2.5">
          <AddBundleItemsDialog
            bundleData={bundles?.[selectedBundleItems]?.data()}
          />
          <Button variant="outline" onClick={getbundleItems}>
            <RefreshCcw />
            Refresh
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="w-full h-[50px] bg-secondary">
            <TableRow>
              <TableHead id="bundleItems" className="pl-8">
                bundleItems lists
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loadingbundleItems ? (
              bundleItems?.length !== 0 ? (
                bundleItems?.map((bundleItems, index) => {
                  const bundleItemsData = bundleItems.data();
                  return (
                    <TableRow key={index} className="h-[70px]">
                      <TableCell className="font-medium pl-8 w-[35%]">
                        <p className="flex items-center gap-2 line-clamp-1 cursor-pointer">
                          <span>{index + 1}.</span>
                          <span>{bundleItemsData.title}</span>
                        </p>
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                              <EllipsisVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => deletebundleItems(bundleItems)}
                              className="text-destructive"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="h-[70px]">
                  <TableCell className="font-medium pl-8">
                    No bundleItems Yet
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow className="relative">
                <TableCell className="h-100 w-[0px]">
                  <Spinner className="absolute top-1/2 left-1/2 size-8" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
