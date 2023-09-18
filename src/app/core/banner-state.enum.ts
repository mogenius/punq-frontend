export enum BannerStateEnum {
  info = 'info',
  warning = 'warning',
  error = 'error',
  success = 'success'
}

export const allBannerState: string[] = Object.keys(BannerStateEnum).filter(
  (type) => isNaN(<any>type) && type !== 'values'
);
