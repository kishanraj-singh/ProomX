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
  const [bundleCategory, setbundleCategory] = useState("tools-apps");
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualImageUrl, setManualImageUrl] = useState("");

  //upload handle
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
        console.log(photoURL);
      }
      //
      const slug = generateSlug(bundleTitle);
      //add bundleItems on firestore
      await addDoc(collection(firestore, "bundles/"), {
        slug: slug,
        title: bundleTitle,
        description: bundleDiscription,
        category: bundleCategory,
        photoURL: manualImageUrl ? manualImageUrl : photoURL,
        uploader: auth.currentUser.uid,
        lastUpdate: new Date(),
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
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus /> Add bundleItems List
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add bundleItems List</DialogTitle>
            <DialogDescription>
              Add a New bundleItems List, After adding bundleItems list you can
              add bundleItems in this List.
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
                    <SelectItem value="tools-apps">Tools & Apps</SelectItem>
                    <SelectItem value="design-assets">Design Assets</SelectItem>
                    <SelectItem value="prompts-content">
                      Prompts & Content
                    </SelectItem>
                    <SelectItem value="guides-tips">Guides & Tips</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
      </form>
    </Dialog>
  );
}
