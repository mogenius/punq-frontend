import { BannerStateEnum } from './banner-state.enum';

export interface IBanner {
  id: string;
  content: string;
  state: BannerStateEnum;
  duration: number;
}
