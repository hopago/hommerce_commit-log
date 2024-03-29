import { Link } from "react-router-dom";

export default function PointLogNavCard() {
  return (
    <div className="point-log-card">
      <div className="point-log-card__wrap">
        <div className="contents">
          <h3>포인트 지급 기록</h3>
          <p>포인트 적립 및 사용 내역을 확인하실 수 있습니다.</p>
        </div>
        <div className="sci">
          <Link to="/myroom/point" className="link">
            바로가기
          </Link>
        </div>
      </div>
    </div>
  );
}
