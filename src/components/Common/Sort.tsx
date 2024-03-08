import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Sort({ sortOption, setSortOption }) {
  return (
    <Select value={sortOption} onValueChange={setSortOption}>
      <SelectTrigger className="w-[160px] py-1">
        <SelectValue placeholder="Sort by categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by categories</SelectLabel>
          <SelectItem value="D">highest to lowest</SelectItem>
          <SelectItem value="A">lowest to highest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Sort;
