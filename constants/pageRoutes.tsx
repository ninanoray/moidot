import { CircleCheckBig, Compass, Settings } from "lucide-react";

export interface PageRoutes {
  title: string;
  pages: PageRoutesItem[];
}

export interface PageRoutesItem {
  title: string;
  url: string;
  icon: React.JSX.Element;
  items?: PageRoutesItem[];
}

export const Menu: PageRoutes[] = [
  {
    title: "메인",
    pages: [
      {
        title: "닷맵",
        url: "/dotmap",
        icon: <Compass />,
      },
      {
        title: "마이닷",
        url: "/dotmap",
        icon: <CircleCheckBig />,
      },
    ],
  },
  {
    title: "기타",
    pages: [
      {
        title: "설정",
        url: "/settings",
        icon: (
          <Settings
            strokeDasharray={100}
            className="group-hover/menu-item:[&_*]:animate-draw group-hover/menu-item:delay-500 group-hover/menu-item:animate-rotate origin-center"
          />
        ),
      },
    ],
  },
];
