// FormData 타입
export interface UploadType {
  video: {
    file?: File | null;
    name: string;
    url: string;
    size?: number;
  };
  duration: number;
  thumbnail: {
    file?: File | null;
    name: string;
    url: string;
    size?: number;
  };
  title: string;
  tags: string[];
  description: string;
}

export interface UpdateType extends UploadType {
  usersId: number;
  videoId: number;
  videoType: 'embedded' | 'upload';
}

// Validation 타입
export interface ValidInfo {
  isValid: boolean;
  inValidMessage: string;
}
export interface ValidMap {
  video: ValidInfo;
  thumbnail: ValidInfo;
  title: ValidInfo;
  tags: ValidInfo;
  description: ValidInfo;
}
