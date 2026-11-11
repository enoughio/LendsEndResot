import type { Metadata } from "next";
import { EnquiryForm } from "@/components/booking/enquiry-form";

export const metadata: Metadata = {
  title: "Retreat enquiry | Land's End",
  description: "Send a retreat enquiry to Land's End: The Last Resort.",
};

export default function RetreatEnquiryPage() {
  return <EnquiryForm kind="RETREAT" />;
}
