import { IHomeSection } from "../interfaces/homeSection";

import {
  recommended_radio_cards,
  recommended_songs_cards,
  podcast_cards,
} from "./homeCard";

export const sections: IHomeSection[] = [
  {
    section_name: "Podcasts to make you smarter",
    card: podcast_cards,
  },
  {
    section_name: "Recommended Radios",
    card: recommended_radio_cards,
  },
  {
    section_name: "Recommended Songs",
    card: recommended_songs_cards,
  },
];
