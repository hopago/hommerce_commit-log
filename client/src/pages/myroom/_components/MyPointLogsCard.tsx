import CurrentPoint from "./CurrentPoint";
import PointLogNavCard from "./PointLogNavCard";

export default function MyPointLogsCard() {
  return (
    <div className="my-point-logs">
      <h1>포인트 내역</h1>
      <div className="my-point-logs__wrap">
        <CurrentPoint />
        <PointLogNavCard />
      </div>
    </div>
  );
}
