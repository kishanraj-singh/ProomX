"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import generateSlug from "@/helper/generateSlug";
import { toast } from "sonner";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/config/firebase";

export default function AddBundleDialog() {
  const [bundleTitle, setbundleTitle] = useState("");
  const [bundleDiscription, setbundleDiscription] = useState("");
  const [bundleCategory, setbundleCategory] = useState("writing-content");

  const handleUpload = async () => {
    const toastId = toast.loading("Uploading bundle...");
    try {
      const slug = generateSlug(bundleTitle);
      //add bundles on firestore
      await addDoc(collection(firestore, "bundles/"), {
        slug: slug,
        title: bundleTitle,
        description: bundleDiscription,
        category: bundleCategory,
        uploader: auth.currentUser.uid,
        createdAt: new Date(),
        status: "draft",
        views: 0,
      });
      await updateDoc(doc(firestore, "appData/searchList"), {
        titles: arrayUnion(bundleTitle),
      });
      toast.success("done", { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add bundle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add bundle</DialogTitle>
          <DialogDescription>
            Add a New bundle, After adding bundle you can add bundleItems in
            this bundle.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Type here..."
              value={bundleTitle}
              onChange={(e) => setbundleTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Type here..."
              value={bundleDiscription}
              onChange={(e) => setbundleDiscription(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={bundleCategory}
              onValueChange={(value) => setbundleCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="writing-content">
                    Writing & Content
                  </SelectItem>
                  <SelectItem value="marketing-sales">
                    Marketing & Sales
                  </SelectItem>
                  <SelectItem value="coding-development">
                    Coding & Development
                  </SelectItem>
                  <SelectItem value="design-image">Design & Image</SelectItem>
                  <SelectItem value="business-productivity">
                    Business & Productivity
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
