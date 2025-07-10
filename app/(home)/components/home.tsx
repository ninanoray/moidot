"use client";

import { Forms, FormsDatePicker } from "@/components/forms";
import FormsDateRangePicker from "@/components/forms/formsDateRangePicker";
import { HomeSchema } from "../schema";

const Home = () => {
  return (
    <div className="bg-layout">
      <Forms schema={HomeSchema} className="w-80">
        <FormsDatePicker name="date" label="날짜" useTime />
        <FormsDateRangePicker name="dateRange" label="기간" useTime />
      </Forms>
    </div>
  );
};

export default Home;
