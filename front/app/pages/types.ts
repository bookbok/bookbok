export enum PageTypes {
  About = 'about',
  Entities = 'entities',
  Entity = 'entity',
  Top = 'top',
}

export interface PageData {
  pageType: PageTypes;
}

// 各ページごとのページデータ

export interface AboutPageProps extends PageData {
  pageType: PageTypes.About;
}

export interface EntitiesPageProps extends PageData {
  pageType: PageTypes.Entities;
}

export interface EntityPageProps extends PageData {
  pageType: PageTypes.Entity;
  id: number;
}

export interface TopPageProps extends PageData {
  pageType: PageTypes.Top;
}
