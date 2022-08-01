export interface PixivRes {
  data: {
    count: string;
    rows: PixivItem[];
  };
  code: string;
  message: string;
}
export interface PixivItem {
  original_url: string;
  tags: string;
  title: string;
}
export interface RealPixivItem {
  pid: number;
  p: number;
  uid: number;
  title: string;
  author: string;
  r18: boolean;
  width: number;
  height: number;
  tags: string[];
  ext: string;
  uploadDate: number;
  urls: {
    original: string;
  };
}
export interface RealPixiv {
  data: RealPixivItem[];
}
