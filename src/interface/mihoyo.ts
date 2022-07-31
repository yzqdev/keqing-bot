export interface TongrenItem {
  post: {
    images: string[];
  };
}
export interface Tongren {
  retcode: string;
  message: string;
  data: {
    list: TongrenItem[];
    last_id: string;
    is_last: boolean;
    is_origin: boolean;
  };
}
