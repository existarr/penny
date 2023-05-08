import { useState, useEffect } from "react";
//import data
import user from "../data/users";

export default function CallDonationType() {
  const [donationData, setDonationData] = useState({});
  useEffect(() => {
    setDonationData(
      user.map((u) => ({
        donateOrganization: u.currentDonationOrganization,
        donateAmount: u.currentDonationAmount,
        targetAmount: u.targetDonationAmount,
        donateType: u.currentDonationType,
      }))[0]
    );
  }, [donationData.donateType]);

  const path = donationData.dataType ? '/penny/singleDonation' : '/penny/groupDonation';

  return path;
}
