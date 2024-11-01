import { IMenuItems } from "../interfaces/menuItemsProps";

interface TailwindClasses {
  style?: string;
}

export const side_items: (IMenuItems & TailwindClasses)[] = [
  {
    iconSize: 23,
    iconString: "home",
    name: "Home",
    pageURL: "/",
    style: "ml-[1px]",
  },
  {
    iconSize: 24,
    iconString: "search",
    name: "Search",
    pageURL: "/",
    style: "ml-[1px]",
  },
  {
    iconSize: 23,
    iconString: "library",
    name: "Library",
    pageURL: "/",
    style: "ml-[2px]",
  },
];

export const side_items_p2: IMenuItems[] = [
  {
    iconSize: 24,
    iconString: "playlist",
    name: "Create Playlist",
    pageURL: "/playlist",
  },
  {
    iconSize: 27,
    iconString: "liked",
    name: "Liked Songs",
    pageURL: "/liked",
  },
];
