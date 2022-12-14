import { useState } from "react";

import { Daily } from "@/lib/state/interface";

interface DashBoardData {
  name: string;
  value: string;
  beforeThreeDayValue: string;
  isDecrese: boolean;
}

interface PickDateDailyAtom {
  week: Daily;
  beforeThreeDay: Daily;
}

const useMapDashBoardData = () => {
  const [dashBoard, setDashBoard] = useState<DashBoardData[]>();

  const roas = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.roas)
        .reduce((pre, current) => pre + current, 0)
    );
  };

  const cost = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.cost)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const imp = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.imp)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const click = (daily: Daily["report"]["daily"]) => {
    const clickValue = daily
      .map((value) => value.click)
      .reduce((pre, current) => pre + current, 0);
    return clickValue < 10000 ? clickValue : clickValue / 10000;
  };

  const conv = (daily: Daily["report"]["daily"]) => {
    return daily
      .map((value) => value.conv)
      .reduce((pre, current) => pre + current, 0);
  };

  const convValue = (daily: Daily["report"]["daily"]) => {
    return (
      daily
        .map((value) => value.convValue)
        .reduce((pre, current) => pre + current, 0) / 10000000
    );
  };

  const mappingDailyData = (daily: PickDateDailyAtom) => {
    const roasWeek = roas(daily.week.report.daily);
    const roasBefore = roas(daily.beforeThreeDay.report.daily);
    const costWeek = cost(daily.week.report.daily);
    const costBefore = cost(daily.beforeThreeDay.report.daily);
    const impWeek = imp(daily.week.report.daily);
    const impBefore = imp(daily.beforeThreeDay.report.daily);
    const clickWeek = click(daily.week.report.daily);
    const clickBefore = click(daily.beforeThreeDay.report.daily);
    const convWeek = conv(daily.week.report.daily);
    const convBefore = conv(daily.beforeThreeDay.report.daily);
    const convValueWeek = convValue(daily.week.report.daily);
    const convValueBefore = convValue(daily.beforeThreeDay.report.daily);

    const newDataSet = [
      {
        name: "ROAS",
        value: `${roasWeek}%`,
        beforeThreeDayValue: `${Math.abs(Math.floor(roasBefore - roasWeek))}%`,
        isDecrese: roasBefore - roasWeek > 0
      },
      {
        name: "?????????",
        value: `${costWeek.toLocaleString("ko-KR")} ??? ???`,
        beforeThreeDayValue: `${Math.abs(costBefore - costWeek).toLocaleString(
          "ko-KR"
        )} ??? ???`,
        isDecrese: costBefore - costWeek > 0
      },
      {
        name: "?????? ???",
        value: `${impWeek} ??? ???`,
        beforeThreeDayValue: `${Math.abs(impBefore - impWeek).toLocaleString(
          "ko-KR"
        )} ??? ???`,
        isDecrese: impBefore - impWeek > 0
      },
      {
        name: "?????????",
        value: clickWeek < 10000 ? `${clickWeek} ???` : `${clickWeek} ??? ???`,
        beforeThreeDayValue:
          clickBefore - clickWeek < 10000
            ? `${Math.abs(clickBefore - clickWeek).toFixed(1)} ???`
            : `${Math.abs(clickBefore - clickWeek).toFixed(1)} ??? ???`,
        isDecrese: clickBefore - clickWeek > 0
      },
      {
        name: "?????? ???",
        value: `${convWeek} ???`,
        beforeThreeDayValue: `${Math.abs(convBefore - convWeek).toLocaleString(
          "ko-KR"
        )} ???`,
        isDecrese: convBefore - convWeek > 0
      },
      {
        name: "??????",
        value: `${convValueWeek.toFixed(1)} ??? ???`,
        beforeThreeDayValue: `${Math.abs(
          convValueBefore - convValueWeek
        ).toFixed(1)} ??? ???`,
        isDecrese: convValueBefore - convValueWeek > 0
      }
    ];

    setDashBoard(newDataSet);
  };

  return { dashBoard, mappingDailyData };
};

export default useMapDashBoardData;
