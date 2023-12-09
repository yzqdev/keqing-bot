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
export interface TongrenResponse {
  datas: TongrenList[];
}
export interface TongrenList {
  title: string;
  coverImage: {
    originalPath: string;
    fileSize: number;
  };
}
