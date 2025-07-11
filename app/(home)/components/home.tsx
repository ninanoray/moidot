"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
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
      <div className="w-100">
        <Forms schema={HomeSchema}>
          <FormsInput type="password" name="password" label="비밀번호" />
          <FormsSelect name="codeName" label="타입" items={TypeSelection} />
          <FormsDatePicker name="date" label="날짜" useTime />
          <FormsDateRangePicker name="dateRange" label="기간" useTime />
          <FormsTextArea name="text" label="내용" />
          <FormsFileInput name="files" label="첨부파일" />
          <RippleButton type="submit">저장</RippleButton>
        </Forms>
        <RippleButton>버튼</RippleButton>
        <RippleButton variant="secondary">버튼</RippleButton>
        <RippleButton variant="destructive">버튼</RippleButton>
        <RippleButton variant="outline">버튼</RippleButton>
        <RippleButton variant="ghost">버튼</RippleButton>
      </div>
    </div>
  );
};

export default Home;
