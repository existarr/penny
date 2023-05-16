import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import { useChart } from "../../components/chart";

// ----------------------------------------------------------------------

DonationAmountGraph.propTypes = {
  chartData: PropTypes.array.isRequired,
  targetAmount: PropTypes.number.isRequired,
};

export default function DonationAmountGraph({
  chartData,
  targetAmount,
  ...other
}) {
  const chartLabels = chartData.map((i) => i.label);

  const chartCurrentSeries = chartData.map((i) => i.currentAmount);
  const chartRestSeries = chartData.map((i) => i.restAmount);

  const chartOptions = useChart({
    colors: ['#0062ff', '#ffa000'],
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName) + " 원",
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "100%", borderRadius: 0 },
      yaxis: 0,
    },
    chart: {
      width: "100%",
      stacked: true,
    },
    xaxis: {
      max: targetAmount,
      categories: chartLabels,
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
      },
    },
    legend: {
      show: false,
    },
  });

  return (
    <Box style={{ marginTop: "-23px" }}>
      <ReactApexChart
        type="bar"
        series={[{ data: chartCurrentSeries }, { data: chartRestSeries }]}
        options={chartOptions}
        height="40%"
        width="300px"
      />
    </Box>
  );
}
