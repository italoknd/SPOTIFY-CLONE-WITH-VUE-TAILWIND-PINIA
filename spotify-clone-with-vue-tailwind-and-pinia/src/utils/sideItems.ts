import { IMenuItems } from "../interfaces/menuItemsProps";

interface TailwindClasses {
  class?: string;
}

export const side_items: (IMenuItems & TailwindClasses)[] = [
  {
    iconSize: 23,
    iconString: "home",
    name: "Home",
    pageURL: "/",
    class: "ml-[1px]",
  },
  {
    iconSize: 24,
    iconString: "search",
    name: "Search",
    pageURL: "/",
    class: "ml-[1px]",
  },
  {
    iconSize: 23,
    iconString: "library",
    name: "Library",
    pageURL: "/",
    class: "ml-[2px]",
  },
];

export const side_items_p2: (IMenuItems & TailwindClasses)[] = [
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
    class: "ml-[1px]",
  },
];
