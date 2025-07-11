"use client";

import {
  Forms,
  FormsDatePicker,
  FormsFileInput,
  FormsInput,
  FormsSelect,
  FormsTextArea,
} from "@/components/forms";
import FormsDateRangePicker from "@/components/forms/formsDateRangePicker";
import { HomeSchema, TypeSelection } from "../schema";

const Home = () => {
  return (
    <div className="bg-layout">
      <Forms schema={HomeSchema} className="w-100">
        <FormsInput type="password" name="password" label="비밀번호" />
        <FormsSelect name="codeName" label="타입" items={TypeSelection} />
        <FormsDatePicker name="date" label="날짜" useTime />
        <FormsDateRangePicker name="dateRange" label="기간" useTime />
        <FormsTextArea name="text" label="내용" />
        <FormsFileInput name="files" label="첨부파일" />
      </Forms>
    </div>
  );
};

export default Home;
