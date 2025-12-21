"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  const [bundleItemsTitle, setbundleItemsTitle] = useState("");
  const [bundleItemsDiscription, setbundleItemsDiscription] = useState("");
  const [buttonClickURL, setButtonClickURL] = useState("");
  const [bundleItemsResourcesFrom, setbundleItemsResourcesFrom] = useState("");
  const [bundleItemsCopyText, setbundleItemsCopyText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualImageUrl, setManualImageUrl] = useState("");

  const handleUpload = async () => {
    event.preventDefault();
    const toastId = toast.loading("Uploading bundleItems...");
    let photoURL = null;
    try {
      //uploading image
      if (selectedImage) {
        const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
        const { timestamp, signature, apiKey, cloudName } =
          await signRes.json();

        const formData = new FormData();
        formData.append("file", selectedImage);
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
      //
      const slug = generateSlug(bundleItemsTitle);
      //add bundleItems on firestore
      await addDoc(collection(firestore, "bundleItems/"), {
        buttonClickURL: buttonClickURL,
        copyText: bundleItemsCopyText,
        resourcesFrom: bundleItemsResourcesFrom,
        bundleSlug: bundleData?.slug,
        createdAt: new Date(),
        description: bundleItemsDiscription,
        photoURL: manualImageUrl ? manualImageUrl : photoURL,
        title: bundleItemsTitle,
        uploader: auth.currentUser.uid,
      });
      const bundleItemsSnapshot = await getDocs(
        query(
          collection(firestore, "bundles/"),
          where("slug", "==", bundleData?.slug)
        )
      );
      await updateDoc(bundleItemsSnapshot.docs[0].ref, {
        lastUpdate: new Date(),
      });
      toast.success("done", { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add bundleItems
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add bundleItems</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 [&_div]:w-[45%]">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Type here..."
              value={bundleItemsTitle}
              onChange={(e) => setbundleItemsTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Type here..."
              value={bundleItemsDiscription}
              onChange={(e) => setbundleItemsDiscription(e.target.value)}
              className="hide-scrollbar"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="button-click-url">Button Click URL</Label>
            <Input
              id="button-click-url"
              placeholder="Type here..."
              value={buttonClickURL}
              onChange={(e) => setButtonClickURL(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="copy-text">Copy Text</Label>
            <Textarea
              id="copy-text"
              placeholder="Type here..."
              value={bundleItemsCopyText}
              onChange={(e) => setbundleItemsCopyText(e.target.value)}
              className="hide-scrollbar"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="resources-from">Resources From</Label>
            <Input
              id="resources-from"
              placeholder="Type here..."
              value={bundleItemsResourcesFrom}
              onChange={(e) => setbundleItemsResourcesFrom(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="file">Choose Photo</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="cursor-pointer"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="manual-photo-url">Manual Photo URL</Label>
            <Input
              id="manual-photo-url"
              type="text"
              placeholder="Type photo url..."
              value={manualImageUrl}
              onChange={(e) => setManualImageUrl(e.target.value)}
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
