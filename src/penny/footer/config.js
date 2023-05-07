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
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
  {
    title: "함께 모금",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "진행 중인 모금",
    path: '/penny/groupDonation',
    icon: icon("ic_blog"),
  },
  {
    title: "기부 내역",
    path: "/penny/donationHistory",
    icon: icon("ic_disabled"),
  },
];

export default footerNavConfig;
