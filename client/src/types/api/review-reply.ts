export interface IReviewReply {
  _id: string;
  userId: string;
  reviewId: string;
  username: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeletedReviewResponse {
  deletedReviewId: string;
}
