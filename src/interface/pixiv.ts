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
