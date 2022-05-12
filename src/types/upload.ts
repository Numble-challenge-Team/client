export interface UploadType {
  title: string;
  description: string;
  duration: string;
  tags: string[];
  thumbNail: File;
}

export interface EmbedUploadType extends UploadType {
  videoUrl: string;
}

export interface AddUploadType extends UploadType {
  video: File;
}
