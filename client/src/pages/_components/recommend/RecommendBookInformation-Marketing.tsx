import { useUser } from "@clerk/clerk-react";

export default function RecommendBookInformationMarketing() {
  const { user } = useUser();

  return (
    <div className="recommend-books__user__horizontal__marketing">
      <div className="recommend-books__user__horizontal__marketing__text-wrap">
        {user ? (
          <>
            <span className="info user">
              <p>{user.username!}님!</p>
            </span>
            <span className="desc user">
              풍푸한 독서 경험을 위해 추천 도서들을 준비했어요.
            </span>
          </>
        ) : (
          <>
            <span className="desc">나에게 필요한 도서, 기쁨을 선물합니다.</span>
            <div className="info">
              <p>취향을 분석해 꼭 맞는 책을 추천 해드릴게요!</p>
            </div>
          </>
        )}
      </div>
      {!user && (
        <div className="btn-wrap">
          <button>로그인하고 더 많은 추천 받기</button>
        </div>
      )}
    </div>
  );
}
