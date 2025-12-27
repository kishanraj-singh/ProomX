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
import { useState } from "react";
import generateSlug from "@/helper/generateSlug";
import { toast } from "sonner";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "@/config/firebase";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function AddBundleItemsDialog({ bundleData }) {
  const [bundleItemTitle, setBundleItemTitle] = useState("");
  const [bundleItemDiscription, setBundleItemDiscription] = useState("");
  const [bundleItemPrompt, setBundleItemPrompt] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleUpload = async () => {
    const toastId = toast.loading("Uploading bundleItem...");
    let photoURL = null;
    try {
      //uploading image
      if (selectedPhoto) {
        const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
        const { timestamp, signature, apiKey, cloudName } =
          await signRes.json();

        const formData = new FormData();
        formData.append("file", selectedPhoto);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "uploads");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await uploadRes.json();
        photoURL = data.secure_url;
      }

      //add bundleItems on firestore
      await addDoc(collection(firestore, "bundleItems/"), {
        title: bundleItemTitle,
        description: bundleItemDiscription,
        prompt: bundleItemPrompt,
        photoURL: photoURL,
        bundleSlug: bundleData?.slug,
        createdAt: new Date(),
        uploader: auth.currentUser.uid,
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
          <Plus />
          Add bundleItem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add bundleItem</DialogTitle>
          <DialogDescription>Add a New bundleItem (Prompt)</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Type here..."
              value={bundleItemTitle}
              onChange={(e) => setBundleItemTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Type here..."
              value={bundleItemDiscription}
              onChange={(e) => setBundleItemDiscription(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Type here..."
              value={bundleItemPrompt}
              className="max-h-50"
              onChange={(e) => setBundleItemPrompt(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="file">Choose Photo</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedPhoto(e.target.files[0])}
              className="cursor-pointer"
            />
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
