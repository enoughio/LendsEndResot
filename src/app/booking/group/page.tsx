import type { Metadata } from "next";
import { EnquiryForm } from "@/components/booking/enquiry-form";

export const metadata: Metadata = {
  title: "Group enquiry | Land's End",
  description: "Send a group booking enquiry to Land's End: The Last Resort.",
};

export default function GroupEnquiryPage() {
  return <EnquiryForm kind="GROUP" />;
}
