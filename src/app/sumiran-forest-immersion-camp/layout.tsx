import type { Metadata } from "next";
import type { ReactNode } from "react";

const CAMP_PATH = "/sumiran-forest-immersion-camp";
const CAMP_TITLE =
	"Sumiran Forest Residential Summer Camp 2026 | Land's End Resort";
const CAMP_DESCRIPTION =
	"A 3-day, 3-night residential summer camp for ages 10-16 in Sumiran Forest near Bhopal. Expert-led storytelling, adventure, sustainability learning, and nature immersion.";

export const metadata: Metadata = {
	title: CAMP_TITLE,
	description: CAMP_DESCRIPTION,
	keywords: [
		"summer camp bhopal",
		"kids camp bhopal",
		"residential summer camp",
		"sumiran forest camp",
		"lands end resort",
		"camp for ages 10-16",
		"nature immersion camp",
	],
	alternates: {
		canonical: CAMP_PATH,
	},
	openGraph: {
		title: CAMP_TITLE,
		description: CAMP_DESCRIPTION,
		url: CAMP_PATH,
		siteName: "Land's End Resort",
		locale: "en_IN",
		type: "website",
		images: [
			{
				url: "/gallery/kids.jpeg",
				width: 1200,
				height: 630,
				alt: "Children at Sumiran Forest Residential Summer Camp",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: CAMP_TITLE,
		description: CAMP_DESCRIPTION,
		images: ["/gallery/kids.jpeg"],
	},
};

export default function SumiranForestCampLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <>{children}</>;
}
