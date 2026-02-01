
export interface ChecklistItemType {
  id: number;
  title: string;
  description: string;
  subItems?: string[];
}

export type TabType = 'checklist' | 'inspiration';

export interface InspirationItemType {
  id: number;
  title: string;
  type: 'behold' | 'bookstory' | 'appetite' | 'skeleton' | 'spinner' | 'login-simple' | 'button-gallery' | 'cart-drawer' | 'input-states' | 'generic-form' | 'content-layout' | 'component-playground'; 
}

export interface Photo {
  id: string;
  folderId: string;
  url: string;
  title: string;
  date: string;
  price?: string;
}

export interface Folder {
  id: string;
  name: string;
  coverUrl: string;
  count: number;
}
