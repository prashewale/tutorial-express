export type BaseModel = {
  id: number;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt?: Date;
  lastModifiedBy?: string;
  isActive: boolean;
  isDeleted: boolean;
};
