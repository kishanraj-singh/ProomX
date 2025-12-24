"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const [searchq, setSearchq] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchq.trim() !== "") {
      router.push(`/search/${searchq}`);
    }
  };

  return (
    <form className="flex flex-col sm:flex-row items-center gap-4 px-2 sm:px-0">
      <InputGroup className="w-full xl:max-w-[450px] h-[45px] ">
        <InputGroupInput
          placeholder="Search for Bundles..."
          value={searchq}
          onChange={(e) => setSearchq(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <Button className="w-full sm:w-[100px] h-[45px]" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
}
