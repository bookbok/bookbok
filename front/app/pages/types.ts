export enum PageTypes {
  About = 'about',
  Top = 'top',
}

export interface PageData {
  pageType: PageTypes;
}

export interface AboutPageProps extends PageData {
  pageType: PageTypes.About;
}

export interface TopPageProps extends PageData {
  pageType: PageTypes.Top;
}
