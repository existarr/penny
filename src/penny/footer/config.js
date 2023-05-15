// component
import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const footerNavConfig = [
  {
    title: "홈",
    path: "/penny/home",
    icon: icon("ic_analytics"),
  },{
    title: "진행 중인 모금",
    path: '/penny/groupDonation',
    icon: icon("ic_blog"),
  },
  {
    title: "기부 내역",
    path: "/penny/donationHistory",
    icon: icon("ic_disabled"),
  },
  {
    title: "기부 랭킹",
    path: "/penny/home",
    icon: icon("ic_disabled"),
  },
  {
    title: "참여 단체 목록",
    path: "/penny/organization-list",
    icon: icon("ic_disabled"),
  },
];

export default footerNavConfig;
