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
    <div className="bg-layout flex flex-col">
      <div className="w-100 max-w-full">
        <Forms schema={HomeSchema}>
          <FormsInput type="password" name="password" label="비밀번호" />
          <FormsSelect name="type" label="타입" items={TypeSelection} />
          <FormsDatePicker name="date" label="날짜" useTime />
          <FormsDateRangePicker name="dateRange" label="기간" useTime />
          <FormsTextArea name="text" label="내용" />
          <FormsFileInput name="files" label="첨부파일" />
          <RippleButton type="submit">저장</RippleButton>
        </Forms>
      </div>
      <div>
        <RippleButton>버튼</RippleButton>
        <RippleButton variant="secondary">버튼</RippleButton>
        <RippleButton variant="destructive">버튼</RippleButton>
        <RippleButton variant="outline">버튼</RippleButton>
        <RippleButton variant="ghost">버튼</RippleButton>
        <h1>h1: 다람쥐 헌 쳇바퀴에 타고파</h1>
        <h2>h2: 다람쥐 헌 쳇바퀴에 타고파</h2>
        <h3>h3: 다람쥐 헌 쳇바퀴에 타고파</h3>
        <h4>h4: 다람쥐 헌 쳇바퀴에 타고파</h4>
        <p>pp: 다람쥐 헌 쳇바퀴에 타고파</p>
        <h5>h5: 다람쥐 헌 쳇바퀴에 타고파</h5>
        <h6>h6: 다람쥐 헌 쳇바퀴에 타고파</h6>
      </div>
    </div>
  );
};

export default Home;
