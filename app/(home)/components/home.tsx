"use client";

import DatePicker from "@/components/datePicker";
import DateRangePicker from "@/components/dateRangePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home = () => {
  return (
    <div className="bg-layout">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="항목을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <DatePicker />
      <DateRangePicker />
    </div>
  );
};

export default Home;
